from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.app.models import db, Transaction, Category
from datetime import datetime
from sqlalchemy import func, case
from sqlalchemy.orm import joinedload

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('', methods=['GET'])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    
    # Optional filters
    type_filter = request.args.get('type')
    category_id = request.args.get('category_id')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    search_query = request.args.get('search')
    
    query = Transaction.query.options(joinedload(Transaction.category)).filter_by(user_id=user_id)
    
    if type_filter:
        if type_filter == 'expense':
            type_filter = 'depense'
        elif type_filter == 'revenue':
            type_filter = 'revenu'
        query = query.filter_by(type=type_filter)
    if category_id:
        query = query.filter_by(category_id=category_id)
    if search_query:
        query = query.filter(Transaction.description.ilike(f'%{search_query}%'))
    if start_date:
        query = query.filter(Transaction.date >= datetime.strptime(start_date, '%Y-%m-%d').date())
    if end_date:
        query = query.filter(Transaction.date <= datetime.strptime(end_date, '%Y-%m-%d').date())
        
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    pagination = query.order_by(Transaction.date.desc()).paginate(page=page, per_page=per_page, error_out=False)
    transactions = pagination.items
    
    return jsonify({
        "data": [{
            "id": t.id,
            "amount": float(t.amount),
            "type": t.type,
            "date": t.date.isoformat(),
            "description": t.description,
            "category": t.category.name if t.category else "Uncategorized",
            "category_color": t.category.color if t.category else "#000000"
        } for t in transactions],
        "meta": {
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "pages": pagination.pages
        }
    }), 200

@transactions_bp.route('', methods=['POST'])
@jwt_required()
def create_transaction():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('amount') or not data.get('type') or not data.get('category_id'):
        return jsonify({"msg": "Missing required fields"}), 400
    
    # Normalize type (frontend sends 'expense'/'revenue', db uses 'depense'/'revenu')
    normalized_type = data['type']
    if normalized_type == 'expense':
        normalized_type = 'depense'
    elif normalized_type == 'revenue':
        normalized_type = 'revenu'
        
    if normalized_type not in ['revenu', 'depense']:
        return jsonify({"msg": "Invalid transaction type"}), 400
        
    try:
        amount = float(data['amount'])
        if amount <= 0:
            return jsonify({"msg": "Amount must be positive"}), 400
    except ValueError:
        return jsonify({"msg": "Invalid amount format"}), 400

    from datetime import timezone
    transaction_date = datetime.now(timezone.utc).strftime('%Y-%m-%d')
    if data.get('date'):
        transaction_date = data['date']

    transaction = Transaction(
        amount=amount,
        type=normalized_type,
        date=datetime.strptime(transaction_date, '%Y-%m-%d').date(),
        description=data.get('description', ''),
        category_id=data['category_id'],
        user_id=user_id
    )
    
    db.session.add(transaction)
    db.session.commit()
    
    return jsonify({"msg": "Transaction created", "id": transaction.id}), 201

@transactions_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(id):
    user_id = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=id, user_id=user_id).first()
    
    if not transaction:
        return jsonify({"msg": "Transaction not found"}), 404
    
    db.session.delete(transaction)
    db.session.commit()
    
    return jsonify({"msg": "Transaction deleted"}), 200

@transactions_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_transaction(id):
    user_id = get_jwt_identity()
    transaction = Transaction.query.options(joinedload(Transaction.category)).filter_by(id=id, user_id=user_id).first()
    
    if not transaction:
        return jsonify({"msg": "Transaction not found"}), 404
    
    return jsonify({
        "id": transaction.id,
        "amount": float(transaction.amount),
        "type": transaction.type,
        "date": transaction.date.isoformat(),
        "description": transaction.description,
        "category_id": transaction.category_id,
        "category": transaction.category.name if transaction.category else "Uncategorized",
        "category_color": transaction.category.color if transaction.category else "#000000"
    }), 200

@transactions_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_transaction(id):
    user_id = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=id, user_id=user_id).first()
    
    if not transaction:
        return jsonify({"msg": "Transaction not found"}), 404
    
    data = request.get_json()
    
    if 'amount' in data:
        try:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({"msg": "Amount must be positive"}), 400
            transaction.amount = amount
        except ValueError:
            return jsonify({"msg": "Invalid amount format"}), 400
            
    if 'type' in data:
        normalized_type = data['type']
        if normalized_type == 'expense':
            normalized_type = 'depense'
        elif normalized_type == 'revenue':
            normalized_type = 'revenu'
            
        if normalized_type not in ['revenu', 'depense']:
            return jsonify({"msg": "Invalid transaction type"}), 400
        transaction.type = normalized_type
        
    if 'category_id' in data:
        # Verify category belongs to user logic could be added here
        transaction.category_id = data['category_id']
        
    if 'date' in data:
        try:
            transaction.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"msg": "Invalid date format"}), 400
            
    if 'description' in data:
        transaction.description = data['description']
        
    try:
        db.session.commit()
        return jsonify({"msg": "Transaction updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Update failed"}), 500

@transactions_bp.route('/stats/summary', methods=['GET'])
@jwt_required()
def get_summary():
    user_id = get_jwt_identity()
    
    total_income = db.session.query(func.sum(Transaction.amount)).filter_by(user_id=user_id, type='revenu').scalar() or 0
    total_expense = db.session.query(func.sum(Transaction.amount)).filter_by(user_id=user_id, type='depense').scalar() or 0
    
    return jsonify({
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": total_income - total_expense
    }), 200

@transactions_bp.route('/stats/by-category', methods=['GET'])
@jwt_required()
def get_stats_by_category():
    user_id = get_jwt_identity()
    
    stats = db.session.query(
        Category.name,
        Category.color,
        func.sum(Transaction.amount)
    ).join(Transaction).filter(Transaction.user_id == user_id, Transaction.type == 'depense').group_by(Category.name, Category.color).all()
    
    return jsonify([{"name": s[0], "color": s[1], "value": s[2]} for s in stats]), 200

@transactions_bp.route('/stats/monthly', methods=['GET'])
@jwt_required()
def get_monthly_stats():
    user_id = get_jwt_identity()
    
    # Get last 6 months of data
    stats = db.session.query(
        func.strftime('%Y-%m', Transaction.date).label('month'),
        func.sum(case((Transaction.type == 'revenu', Transaction.amount), else_=0)).label('income'),
        func.sum(case((Transaction.type == 'depense', Transaction.amount), else_=0)).label('expense')
    ).filter(Transaction.user_id == user_id).group_by('month').order_by('month').limit(6).all()
    
    return jsonify([{
        "month": s[0],
        "income": float(s[1] or 0),
        "expense": float(s[2] or 0)
    } for s in stats]), 200

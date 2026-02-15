from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.app.models import db, Category

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('', methods=['GET'])
@jwt_required()
def get_categories():
    user_id = get_jwt_identity()
    categories = Category.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": c.id, "name": c.name, "color": c.color} for c in categories]), 200

@categories_bp.route('', methods=['POST'])
@jwt_required()
def create_category():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('name'):
        return jsonify({"msg": "Category name is required"}), 400
    
    category = Category(
        name=data['name'],
        color=data.get('color', '#3B82F6'),
        user_id=user_id
    )
    
    db.session.add(category)
    db.session.commit()
    
    return jsonify({"id": category.id, "name": category.name, "color": category.color}), 201

@categories_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_category(id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=id, user_id=user_id).first()
    
    if not category:
        return jsonify({"msg": "Category not found"}), 404
    
    return jsonify({"id": category.id, "name": category.name, "color": category.color}), 200

@categories_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=id, user_id=user_id).first()
    
    if not category:
        return jsonify({"msg": "Category not found"}), 404
    
    data = request.get_json()
    
    if 'name' in data:
        category.name = data['name']
    
    if 'color' in data:
        category.color = data['color']
        
    try:
        db.session.commit()
        return jsonify({"msg": "Category updated", "id": category.id, "name": category.name, "color": category.color}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Update failed"}), 500

@categories_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=id, user_id=user_id).first()
    
    if not category:
        return jsonify({"msg": "Category not found"}), 404
    
    # Optional: Check if category is used in transactions
    # transactions_count = Transaction.query.filter_by(category_id=id).count()
    # if transactions_count > 0:
    #     return jsonify({"msg": "Cannot delete category with associated transactions"}), 400
    
    db.session.delete(category)
    db.session.commit()
    
    return jsonify({"msg": "Category deleted"}), 200

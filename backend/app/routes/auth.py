from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from backend.app.models import db, User, Category

from backend.app import limiter

import re
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)

def validate_password_strength(password):
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r"\d", password):
        return False, "Password must contain at least one digit"
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least one special character"
    return True, ""

@auth_bp.route('/register', methods=['POST'])
@limiter.limit("5 per minute")
def register():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Champs obligatoires manquants"}), 400
    
    # Password Validation (Internal helper already provides messages, let's translate them there too)
    is_valid, msg = validate_password_strength(data['password'])
    if not is_valid:
        # Translate common strength messages
        trans = {
            "Password must be at least 8 characters long": "Le mot de passe doit contenir au moins 8 caractères",
            "Password must contain at least one uppercase letter": "Le mot de passe doit contenir au moins une lettre majuscule",
            "Password must contain at least one lowercase letter": "Le mot de passe doit contenir au moins une lettre minuscule",
            "Password must contain at least one digit": "Le mot de passe doit contenir au moins un chiffre",
            "Password must contain at least one special character": "Le mot de passe doit contenir au moins un caractère spécial"
        }
        return jsonify({"msg": trans.get(msg, msg)}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Ce nom d'utilisateur est déjà utilisé"}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Cet email est déjà utilisé"}), 400
    
    try:
        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.flush() # Get user.id

        # Seed default categories
        default_categories = [
            {'name': 'Salaire', 'color': '#16A34A'},
            {'name': 'Alimentation', 'color': '#DC2626'},
            {'name': 'Transport', 'color': '#F59E0B'},
            {'name': 'Logement', 'color': '#1E3A8A'},
            {'name': 'Loisirs', 'color': '#3B82F6'}
        ]
        
        for cat_data in default_categories:
            category = Category(name=cat_data['name'], color=cat_data['color'], user_id=user.id)
            db.session.add(category)

        db.session.commit()
        logger.info(f"New user registered: {data['username']}")
        return jsonify({"msg": "Inscription réussie"}), 201
    except Exception as e:
        db.session.rollback()
        logger.error(f"Registration failed for {data.get('username')}: {str(e)}")
        return jsonify({"msg": "L'inscription a échoué"}), 500

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Nom d'utilisateur ou mot de passe manquant"}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        logger.info(f"User logged in: {user.username}")
        return jsonify(
            access_token=access_token, 
            refresh_token=refresh_token,
            user={"id": user.id, "username": user.username}
        ), 200
    
    logger.warning(f"Failed login attempt for username: {data.get('username')}")
    return jsonify({"msg": "Nom d'utilisateur ou mot de passe incorrect"}), 401

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify(access_token=new_access_token), 200

@auth_bp.route('/update-profile', methods=['PUT'])
@jwt_required()
@limiter.limit("5 per minute")
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()
    
    if 'username' in data:
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user and existing_user.id != user.id:
            return jsonify({"msg": "Username already exists"}), 400
        user.username = data['username']
        
    if 'email' in data:
        existing_email = User.query.filter_by(email=data['email']).first()
        if existing_email and existing_email.id != user.id:
            return jsonify({"msg": "Email already exists"}), 400
        user.email = data['email']

    try:
        db.session.commit()
        logger.info(f"User profile updated: {user.username}")
        return jsonify({"msg": "Profile updated successfully", "user": {"id": user.id, "username": user.username, "email": user.email}}), 200
    except Exception as e:
        db.session.rollback()
        logger.error(f"Profile update failed for user {user.id}: {str(e)}")
        return jsonify({"msg": "Failed to update profile"}), 500

@auth_bp.route('/change-password', methods=['PUT'])
@jwt_required()
@limiter.limit("3 per minute")
def change_password():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()
    
    if not data.get('current_password') or not data.get('new_password'):
        return jsonify({"msg": "Missing current or new password"}), 400

    if not user.check_password(data['current_password']):
        return jsonify({"msg": "Incorrect current password"}), 401

    # Validate new password strength
    is_valid, msg = validate_password_strength(data['new_password'])
    if not is_valid:
        return jsonify({"msg": msg}), 400

    try:
        user.set_password(data['new_password'])
        db.session.commit()
        logger.info(f"Password changed for user: {user.username}")
        return jsonify({"msg": "Password changed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        logger.error(f"Password change failed for user {user.id}: {str(e)}")
        return jsonify({"msg": "Failed to change password"}), 500

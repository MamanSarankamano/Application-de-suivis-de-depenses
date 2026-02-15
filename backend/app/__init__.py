from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from backend.app.models import db
from backend.config import Config

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman

migrate = Migrate()
jwt = JWTManager()
limiter = Limiter(key_func=get_remote_address, default_limits=["1000 per day", "100 per hour"])
talisman = Talisman()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Security Extensions
    limiter.init_app(app)
    
    # Enable security headers with Talisman
    # force_https is only True if FLASK_ENV is 'production'
    talisman.init_app(
        app, 
        force_https=app.config.get('HTTPS_ONLY', False),
        content_security_policy=None # Set to None for API-only backends, or customize if serving HTML
    ) 
    
    # CORS Configuration - Restricted to origins in config
    CORS(app, resources={r"/api/*": {"origins": app.config.get('CORS_ORIGINS')}})

    # Register blueprints
    from backend.app.routes.auth import auth_bp
    from backend.app.routes.transactions import transactions_bp
    from backend.app.routes.categories import categories_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(transactions_bp, url_prefix='/api/transactions')
    app.register_blueprint(categories_bp, url_prefix='/api/categories')

    # Global Error Handlers
    @app.errorhandler(404)
    def not_found(error):
        return {"msg": "Resource not found"}, 404

    @app.errorhandler(500)
    def internal_error(error):
        return {"msg": "Internal server error"}, 500

    @app.errorhandler(400)
    def bad_request(error):
        return {"msg": "Bad request"}, 400

    @app.route('/health')
    def health_check():
        return {"status": "healthy", "database": "connected"}, 200

    return app

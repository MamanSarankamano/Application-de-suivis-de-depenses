import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app, db

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Avoid creating tables in production - use migrations instead
        if app.config.get('FLASK_ENV') == 'development':
            db.create_all() 
    app.run(debug=app.config.get('DEBUG', False), host='0.0.0.0', port=5000)

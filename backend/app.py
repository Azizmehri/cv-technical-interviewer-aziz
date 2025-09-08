from flask import Flask
from controllers.crud_controller import crud_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

app.register_blueprint(crud_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True,port=5000)

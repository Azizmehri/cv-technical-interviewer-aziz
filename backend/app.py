from flask import Flask
from controllers.crud_controller import crud_bp
from controllers.user_controller import user_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

app.register_blueprint(crud_bp, url_prefix="/")
app.register_blueprint(user_bp, url_prefix="/")

if __name__ == "__main__":
    app.run(debug=True,port=5000)
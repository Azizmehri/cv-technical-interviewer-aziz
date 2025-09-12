from flask import Flask, request, jsonify,Blueprint
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_cors import CORS
import os
from dotenv import load_dotenv
import os
import jwt
from config.db_config import users_collection
crud_bp = Blueprint("crud_bp", __name__)

app = Flask(__name__)
CORS(app)


load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET", "fallback_secret")
# ------------------- SIGNUP -------------------
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"redirect": "/login", "error": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = {
        "email": email,
        "password": hashed_password
    }
    result=users_collection.insert_one(new_user)
    token = jwt.encode({"user_id": str(result.inserted_id)}, JWT_SECRET, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    print("JWT Token:", token)
    return jsonify({"token": token}), 201

# ------------------- LOGIN -------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"redirect": "/signup", "error": "Invalid email or password"}), 400

    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid email or password"}), 400
    token = jwt.encode({"user_id": str(user["_id"])}, JWT_SECRET, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    print("JWT Token:", token)
    return jsonify({"token": token}), 201
    


if __name__ == "__main__":
    app.run(debug=True, port=5000)

from flask import Flask, request, jsonify,Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import os
from dotenv import load_dotenv
import jwt
from config.db_config import db

user_bp = Blueprint("user_bp", __name__)



load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET", "fallback_secret")
# ------------------- SIGNUP -------------------
@user_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 200

    existing_user = db["users"].find_one({"email": email})
    if existing_user:
        return jsonify({"redirect": "/login", "error": "User already exists"}), 200

    hashed_password = generate_password_hash(password)
    new_user = {
        "email": email,
        "password": hashed_password
    }
    result=db["users"].insert_one(new_user)
    token = jwt.encode({"user_id": str(result.inserted_id)}, JWT_SECRET, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    print("JWT Token:", token)
    return jsonify({"token": token}), 201

# ------------------- LOGIN -------------------
@user_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = db["users"].find_one({"email": email})
    if not user:
        return jsonify({"redirect": "/signup", "error": "Invalid email or password"}), 200

    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid email or password"}), 200
    token = jwt.encode({"user_id": str(user["_id"])}, JWT_SECRET, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    print("JWT Token:", token)
    return jsonify({"token": token}), 201
    


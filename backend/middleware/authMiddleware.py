from flask import request, jsonify
import jwt,os
from functools import wraps
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1] 
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user_id = data["user_id"]  # attach user info to request
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated
        
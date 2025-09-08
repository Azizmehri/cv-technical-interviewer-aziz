from middleware.authMiddleware import token_required
from flask import request,Blueprint,jsonify
from services.helper_func import extract_text, parse_cv
from config.db_config import db
from bson import ObjectId
from datetime import datetime

crud_bp = Blueprint("crud_bp", __name__)

@crud_bp.route("/uploadCv", methods=["POST"])
#@token_required
def ResumeUpload():
    try:
        user_id = request.form.get("userId")
        print(user_id)
        file = request.files.get("file")
        cv_text = extract_text(file)
        if not cv_text.strip():
            return jsonify({"error": "File is empty"}), 400
        cv_payload = {
            "user_id" : ObjectId(user_id),
            "cv_text" : cv_text,
            "created_at": datetime.utcnow(),
        }
        db["cv"].insert_one(cv_payload)
        #return parse_cv(cv_text)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Error when dealing with file"}), 500
    




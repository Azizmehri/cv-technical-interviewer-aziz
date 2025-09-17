from bson import ObjectId
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# ✅ MongoDB connection
app.config["MONGO_URI"] = "mongodb+srv://mohamedazizmehripro_db_user:270705@cluster0.rmnt2no.mongodb.net/Interview?retryWrites=true&w=majority"
mongo = PyMongo(app)

interview_collection = mongo.db.interview_session


def serialize_doc(doc):
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    if "user_id" in doc:
        doc["user_id"] = str(doc["user_id"])
    if "cv_id" in doc:
        doc["cv_id"] = str(doc["cv_id"])
    if "modules" in doc:
        for m in doc["modules"]:
            m["_id"] = str(m["_id"])
            if "questions" in m:
                for q in m["questions"]:
                    q["_id"] = str(q["_id"])
    if "created_at" in doc and isinstance(doc["created_at"], datetime.datetime):
        doc["created_at"] = doc["created_at"].isoformat()

    return doc["modules"]


# -----------------------------
# Routes
# -----------------------------

@app.route("/interview/<id>", methods=["GET"])
def get_interview(id):
    """Fetch one interview document by ObjectId"""
    try:
        doc = interview_collection.find_one({"_id": ObjectId(id)})
    except Exception:
        return jsonify({"error": "Invalid ObjectId"}), 400

    if not doc:
        return jsonify({"error": "Not found"}), 404

    return jsonify(serialize_doc(doc))


@app.route("/interview/<id>/answers", methods=["POST"])
def save_answers(id):
    """Save candidate's answers for an interview"""
    data = request.get_json()

    if not data or "answers" not in data or not data["answers"]:
        return jsonify({"error": "No answers provided"}), 400

    try:
        updated = 0  # track how many answers got matched

        for i in data["answers"]:
            module_id = ObjectId(i["module_id"])
            question_id = ObjectId(i["question_id"])

            result = interview_collection.update_one(
                {"_id": ObjectId(id)},
                {
                    "$set": {
                        "modules.$[m].questions.$[q].answer": i["answer"],
                        "updated_at": datetime.datetime.utcnow(),
                    }
                },
                array_filters=[
                    {"m._id": module_id},
                    {"q._id": question_id}
                ]
            )

            if result.matched_count > 0:
                updated += 1

        if updated == 0:
            return jsonify({"error": "No matching module/question found"}), 404

        print("✅ Received answers:", data)
        return jsonify({"message": "✅ Answers saved successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=5000)

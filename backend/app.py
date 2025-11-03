from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime



app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "your_secret_key_here"  # Change this in production

 # MongoDB Atlas setup
mongo_client = MongoClient("mongodb+srv://ml_dept_project:ml_dept_project@ml-project.gkigx.mongodb.net/")
db = mongo_client["artconnect"]


# Home route
@app.route("/")
def home():
    return jsonify({"message": "ArtConnect backend is running.", "mongodb_status": str(mongo_client is not None)})

# Signup endpoint
@app.route("/api/auth/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        print(f"[DEBUG] Received signup data: {data}")
        username = data.get("username")
        password = data.get("password")
        if not username or not password:
            print("[DEBUG] Missing username or password.")
            return jsonify({"error": "Username and password required."}), 400
        if db.users.find_one({"username": username}):
            print(f"[DEBUG] Username already exists: {username}")
            return jsonify({"error": "Username already exists."}), 409
        hashed_pw = generate_password_hash(password)
        result = db.users.insert_one({"username": username, "password": hashed_pw})
        print(f"[DEBUG] Inserted user with _id: {result.inserted_id}")
        return jsonify({"message": "User registered successfully."}), 201
    except Exception as e:
        print(f"[ERROR] Exception during signup: {e}")
        return jsonify({"error": "Internal server error."}), 500

# Signin endpoint
@app.route("/api/auth/signin", methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    print(f"[DEBUG] Received signin request: username={username}, password={password}")
    user = db.users.find_one({"username": username})
    print(f"[DEBUG] User found in DB: {user}")
    if not user or not check_password_hash(user["password"], password):
        print("[DEBUG] Invalid credentials.")
        return jsonify({"error": "Invalid credentials."}), 401
    token = jwt.encode({
        "username": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
    }, app.config["SECRET_KEY"], algorithm="HS256")
    print(f"[DEBUG] Signin successful for {username}")
    return jsonify({"token": token, "message": "Signin successful."})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

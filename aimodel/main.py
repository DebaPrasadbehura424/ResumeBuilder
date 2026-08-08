from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from textblob import TextBlob


import pandas as pd
import os

app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"http://localhost:5173"}})


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "words.csv")
df = pd.read_csv(csv_path)



df=pd.read_csv("C:/Users/debap/OneDrive/Desktop/Final product/mern/ResumeBuilder/aimodel/words.csv")

word_strength = dict(zip(df['weak'].str.lower(), df['strong']))

@app.get("/")
def home():
    return jsonify({
        "status": "OK",
        "message": "Resume Builder AI API is running 🚀",
        "endpoints": {
            "analyze": "POST /analyze",
            "improve_summary": "POST /improve_summary"
        }
    })

@app.post("/checkAts")
def checkAts():
    resume = request.get_json()

    # Basic Info
    basic_info = resume.get("basic_info", {})
    fullname = basic_info.get("fullname", "")
    email = basic_info.get("email", "")
    phone = basic_info.get("phone", "")
    country = basic_info.get("country", "")
    state = basic_info.get("state", "")
    city = basic_info.get("city", "")

    # Other Fields
    certification = resume.get("certification", {})
    summary = resume.get("summary", "")
    skills = resume.get("skills", [])
    education = resume.get("education", [])
    projects = resume.get("projects", [])
    photo = resume.get("photo", "")

    score = 0

    # -------------------------
    # 1. Basic Information - 15
    # -------------------------
    basic_fields = [
        fullname,
        email,
        phone,
        country,
        state,
        city
    ]

    filled_basic = sum(1 for field in basic_fields if field)

    score += (filled_basic / len(basic_fields)) * 15


    # -------------------------
    # 2. Summary - 10
    # -------------------------
    if summary:
        if len(summary) >= 100:
            score += 10
        elif len(summary) >= 50:
            score += 7
        else:
            score += 4


    # -------------------------
    # 3. Skills - 20
    # -------------------------
    skill_count = len(skills)

    if skill_count >= 10:
        score += 20
    elif skill_count >= 7:
        score += 15
    elif skill_count >= 4:
        score += 10
    elif skill_count >= 1:
        score += 5


    # -------------------------
    # 4. Education - 15
    # -------------------------
    education_count = len(education)

    if education_count >= 3:
        score += 15
    elif education_count == 2:
        score += 12
    elif education_count == 1:
        score += 8


    # -------------------------
    # 5. Projects - 25
    # -------------------------
    project_count = len(projects)

    if project_count >= 4:
        score += 25
    elif project_count == 3:
        score += 20
    elif project_count == 2:
        score += 15
    elif project_count == 1:
        score += 8


    # -------------------------
    # 6. Certifications - 10
    # -------------------------
    if isinstance(certification, list):
        certification_count = len(certification)
    elif isinstance(certification, dict):
        certification_count = len(certification)
    else:
        certification_count = 0

    if certification_count >= 3:
        score += 10
    elif certification_count == 2:
        score += 7
    elif certification_count == 1:
        score += 4


    # -------------------------
    # 7. Photo - 5
    # -------------------------
    if photo:
        score += 5


    # Make sure score is between 0 and 100
    score = round(min(max(score, 0), 100))


    return {
        "success": True,
        "ats_score": score
    }

@app.post("/analyze")
def analyze():
    data = request.json
    resume = data["resume"]
    jd = data["jd"]
    tfidf = TfidfVectorizer() 
    vectors = tfidf.fit_transform([resume,jd]) 
    score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
    words_count = len(resume.split())

    if words_count < 20:
        length_category = "too_short"
    elif words_count < 50:
        length_category = "short"
    elif words_count < 150:
        length_category = "medium"
    else:
        length_category = "long"


    return jsonify({
        "match_score": round(score * 100, 2),
        "resume_length": words_count,
        "length_category": length_category
    })

@app.post("/improve_summary")
def improveSummary():
    data=request.json
    summary= data["resume"]

    blob= TextBlob(summary)
    corrected=str(blob.correct())
    words=corrected.split()
    improved=[]
    for w in words:
      lw = w.lower().strip(",.!?;:")
      if lw in word_strength:
        improved.append(word_strength[lw])
      else:
        improved.append(w)
    final = " ".join(improved)

    return jsonify({
        "improved_summary": f"{final.capitalize()}. Focused on delivering high-quality work and continuous improvement."
    })

# app.run(port=5000)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


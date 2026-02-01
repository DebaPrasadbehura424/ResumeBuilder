from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"http://localhost:5173"}})
print("started")

@app.post("/analyze")
def analyze():
    data = request.json
    resume = data["resume"]
    jd = data["jd"]
    print(resume)
    print(jd)

    # resume = "python developer machine learning"
    # jd = "python machine learning"


    tfidf = TfidfVectorizer()  # converts text to numbers
    vectors = tfidf.fit_transform([resume,jd]) # trains the model

    score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]  # check similarity

    # Cosine similarity =(R • J) / ( |R| × |J| )
    # magnitude means square root+add + root over

    return jsonify({
        "match_score": round(score * 100, 2)
    })

app.run(port=5000)

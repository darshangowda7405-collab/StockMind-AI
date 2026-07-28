import joblib

MODEL = joblib.load(
    "app/ml/models/stockmind_model.pkl"
)


def predict(features):
    prediction = MODEL.predict([features])[0]

    probability = MODEL.predict_proba([features])[0]

    confidence = round(
        max(probability) * 100,
        2,
    )

    return {
        "prediction": "Bullish" if prediction else "Bearish",
        "confidence": confidence,
    }
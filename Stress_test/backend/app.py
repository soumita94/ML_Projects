import pickle
from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.responses import JSONResponse
from typing import Literal, Annotated
import pandas as pd
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
ARTIFACTS_DIR = BASE_DIR / "artifacts"

with open(ARTIFACTS_DIR / "model.pkl", "rb") as f:
    bundle = pickle.load(f)

model = bundle["model"]
scaler = bundle["scaler"]
ordinal_encoder = bundle["ordinal_encoder"]
label_encoder = bundle["label_encoder"]
print("Artifacts loaded successfully")


class UserInput(BaseModel):
    Attendance_Status: Annotated[
        Literal['Late', 'Present', 'Absent'],
        Field(description='Attendance status of student')
    ]
    Stress_Level: Annotated[
        float, Field(gt=0.5, lt=5.0, description='Stress level of student')
    ]
    Anxiety_Level: Annotated[
        float, Field(gt=1.0, lt=10.0, description='Anxiety level of student')
    ]
    Mood_Score: Annotated[
        float, Field(gt=1.0, lt=10.0, description='Mood score of student')
    ]

@app.post("/predict")
def predict_StudentRisk(data: UserInput):

    input_df = pd.DataFrame([{
        "Attendance Status": data.Attendance_Status,
        "Stress Level (GSR)": data.Stress_Level,
        "Anxiety Level": data.Anxiety_Level,
        "Mood Score": data.Mood_Score
    }])

    # scale numerical columns
    input_df[["Stress Level (GSR)", "Anxiety Level", "Mood Score"]] = scaler.transform(
        input_df[["Stress Level (GSR)", "Anxiety Level", "Mood Score"]]
    )
    # Encode attendance
    input_df[["Attendance Status"]] = ordinal_encoder.transform(
        input_df[["Attendance Status"]]
    )


    prediction_encoded = model.predict(input_df)[0]
    prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]


    return JSONResponse(
        status_code=200,
        content={"predicted_category": prediction_label}
    )

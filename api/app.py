from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from google.cloud import language_v1

api = FastAPI()




api.add_middleware(
    
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
  
)

@api.post("/analyze")
def analyze():
        return {"message": "Hello, World!"}

@api.get("/analyze")
def analyze():
        return {"message": "o, World!"}
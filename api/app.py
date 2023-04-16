from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from google.cloud import language_v1
from fastapi.responses import JSONResponse



api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = language_v1.LanguageServiceClient()

@api.get("/")
def analyze(who: str = None):
    text = who

    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    content_categories_version = (
        language_v1.ClassificationModelOptions.V2Model.ContentCategoriesVersion.V2
    )
    response = client.classify_text(
        request={
            "document": document,
            "classification_model_options": {
                "v2_model": {"content_categories_version": content_categories_version}
            },
        }
    )
    categories = [{"name": category.name, "confidence": category.confidence} for category in response.categories]
    response_data = {"message": text, "categories": categories}
    return response_data
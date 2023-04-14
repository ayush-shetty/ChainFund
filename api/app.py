from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from google.cloud import language_v1

api = FastAPI()

# Allow all origins to access this API (You can also specify a list of origins if needed)
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.post('/analyze')
def analyze(request: dict):
    content = request['content']

    # Instantiates a client
    client = language_v1.LanguageServiceClient()

    document = language_v1.Document(
        content=content,
        type_=language_v1.Document.Type.PLAIN_TEXT
    )

    # Analyze the user input for entities and categories
    userInputEntities = client.analyze_entities(
        document=document
    ).entities

    userInputCategories = client.classify_text(
        document=document
    ).categories

    # Filter the campaigns based on matching entities and categories
    relevant_campaigns = []
    for campaign in request['campaigns']:
        campaignEntities = client.analyze_entities(
            document=language_v1.Document(
                content=campaign['description'],
                type_=language_v1.Document.Type.PLAIN_TEXT
            )
        ).entities
        campaignCategories = client.classify_text(
            document=language_v1.Document(
                content=campaign['description'],
                type_=language_v1.Document.Type.PLAIN_TEXT
            )
        ).categories

        matching_entities = [entity for entity in campaignEntities if
                             any(inputEntity.name == entity.name for inputEntity in userInputEntities)]
        matching_categories = [category for category in campaignCategories if
                               any(inputCategory.name == category.name for inputCategory in userInputCategories)]

        if len(matching_entities) > 0 or len(matching_categories) > 0:
            relevant_campaigns.append(campaign)

    return relevant_campaigns

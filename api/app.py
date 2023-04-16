from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from google.cloud import language_v1
from fastapi.responses import JSONResponse

from thirdweb import ThirdwebSDK


#sdk = ThirdwebSDK("goerli")
#contract = sdk.get_contract('0x3ea94a25514C50d48dbCC67a58534d25ACDE0B2c')
#campaigns = contract.call('getCampaigns')

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
    text = f"Hello, {who}!"
  
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    sentiment = client.analyze_sentiment(request={"document": document}).document_sentiment
    response_data = {"message": text, "sentiment": {"score": sentiment.score, "magnitude": sentiment.magnitude}}
    return JSONResponse(content=response_data)

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from openai import AzureOpenAI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AzureOpenAI(
    # https://learn.microsoft.com/azure/ai-services/openai/reference#rest-api-versioning
    api_version="2024-02-15-preview",
    # https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource
    azure_endpoint=os.getenv("AZURE_ENDPOINT"),
)

class URLCheckRequest(BaseModel):
    url: str

@app.post("/check_url")
async def check_url(request: URLCheckRequest):
    prompt = f"Describe the following URL: {request.url}. Provide a brief description of the website."

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an AI trained to provide descriptions of websites based on their URLs."},
            {"role": "user", "content": prompt}
        ]
    )
    return {"result": completion.choices[0].message.content}
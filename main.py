from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from dotenv import load_dotenv
import os
import uvicorn
from openai import AzureOpenAI, OpenAI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # allow all origins
    allow_credentials=True, # allow credentials
    allow_methods=["*"], # allow all methods
    allow_headers=["*"], # allow all headers
)

# OpenAI client
if "AZURE_ENDPOINT" in os.environ:
    client = AzureOpenAI(
        # https://learn.microsoft.com/azure/ai-services/openai/reference#rest-api-versioning
        api_version="2024-02-15-preview",
        # https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource
        azure_endpoint=os.getenv("AZURE_ENDPOINT"),
    )
elif "OPENAI_API_KEY" in os.environ:
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY")
    )
else:
    raise EnvironmentError("Missing required OpenAI API configuration. Please configure AZURE_ENDPOINT or OPENAI_API_KEY in your environment variables")


# Define a Pydantic model for the POST request payload
class URLCheckRequest(BaseModel):
    url: HttpUrl

# Endpoint to check URL and get description using OpenAI
@app.post("/check_url")
async def check_url(request: URLCheckRequest):
    prompt = f"Describe the following URL: {request.url}. Provide a brief description of the website."

    try:
        # Chat Completion
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an AI trained to provide descriptions of websites based on their URLs."},
                {"role": "user", "content": prompt}
            ]
        )
        return {"result": completion.choices[0].message.content}
    except Exception as e:
        # Handle API errors gracefully
        raise HTTPException(status_code=500, detail=str(e))
    

# Entry point when running with `uvicorn` server
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)

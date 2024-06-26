import openai
from dotenv import load_dotenv
import os

load_dotenv()

from openai import AzureOpenAI

# gets the API Key from environment variable AZURE_OPENAI_API_KEY
client = AzureOpenAI(
    # https://learn.microsoft.com/azure/ai-services/openai/reference#rest-api-versioning
    api_version="2024-02-15-preview",
    # https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource
    azure_endpoint=os.getenv("AZURE_ENDPOINT"),
)

completion = client.chat.completions.create(
    model="gpt-4o",  # e.g. gpt-35-instant
    messages=[
        {
            "role": "user",
            "content": "say hello",
        },
    ],
)

print({"result": completion.choices[0].message.content})
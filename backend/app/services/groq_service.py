import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile").strip()


def get_groq_client():
    if not GROQ_API_KEY or GROQ_API_KEY.lower() in {
        "your_groq_api_key_here",
        "changeme",
        "placeholder",
    }:
        raise ValueError(
            "GROQ_API_KEY is missing or invalid. Add a valid key to backend/.env."
        )

    return Groq(api_key=GROQ_API_KEY)


def chat_completion(messages, model=None, temperature=0.4, max_tokens=500, **kwargs):
    client = get_groq_client()

    response = client.chat.completions.create(
        model=model or GROQ_MODEL,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
        **kwargs,
    )

    return response.choices[0].message.content
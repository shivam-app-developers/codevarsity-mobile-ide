import json
import time
from pathlib import Path
from dotenv import load_dotenv
import google.genai as genai
from google.genai import types
import sys

# Import our script's logic
sys.path.append(str(Path(".")))
from generate_practice_snippets import get_schema, PROMPT_TEMPLATES, MODEL

load_dotenv(".env")
client = genai.Client()

test_file = Path("input_snippets/python/batch_01/binary_and_operator.py")
with open(test_file, "r", encoding="utf-8") as f:
    code_content = f.read()

challenge_type = "bug_squasher"
schema = get_schema(challenge_type)
prompt = PROMPT_TEMPLATES[challenge_type].format(
    language="python", code=code_content, schema=json.dumps(schema)
)

print(f"Testing synchronous generation for {test_file.name} ({challenge_type})...")

try:
    start = time.time()
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    end = time.time()
    print(f"\nSuccess! Generated in {end - start:.2f} seconds.")
    print("\n--- Output ---")
    print(response.text[:500] + "\n...[truncated]...")

except Exception as e:
    print(f"\n❌ API Error: {e}")

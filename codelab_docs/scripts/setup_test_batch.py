import os
import shutil
from pathlib import Path
import google.genai as genai
from dotenv import load_dotenv

# Cancel the massive batch job
load_dotenv(".env")
print("Cancelling the previous batch job...")
try:
    client = genai.Client()
    client.batches.delete(name="batches/8kbfxgg4idrfjhvpa1eu9el9umypghd4xpbx")
    print("Successfully deleted/cancelled the batch job.")
except Exception as e:
    print(f"Error cancelling job: {e}")

# Set up test batch
input_dir = Path("input_snippets/python/batch_01")
test_dir = Path("input_snippets/python/test_batch")

test_dir.mkdir(parents=True, exist_ok=True)

try:
    files = [f for f in input_dir.iterdir() if f.is_file()][:3]
    for f in files:
        shutil.copy2(f, test_dir / f.name)
        print(f"Copied {f.name} to test_batch")
    print("\nTest batch setup complete. Ready to run generate_practice_snippets.py!")
except Exception as e:
    print(f"Error setting up test files: {e}")

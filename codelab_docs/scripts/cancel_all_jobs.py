import google.genai as genai
from dotenv import load_dotenv
import os

load_dotenv(".env")
client = genai.Client()

print("Listing all batch jobs...")
jobs = client.batches.list()

for job in jobs:
    print(f"Cancelling Job: {job.name} (State: {job.state})")
    try:
        client.batches.delete(name=job.name)
        print(f"Successfully cancelled {job.name}")
    except Exception as e:
        print(f"Failed to cancel {job.name}: {e}")

print("Cleanup complete.")

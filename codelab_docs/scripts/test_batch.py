import google.genai as genai
import json
import os
import time
from dotenv import load_dotenv

load_dotenv()
client = genai.Client()

requests = [
    {
        "id": "test_1",
        "request": {"contents": [{"parts": [{"text": "Say hello world"}]}]},
    }
]

# Write to jsonl
with open("test_batch.jsonl", "w") as f:
    for req in requests:
        f.write(json.dumps(req) + "\n")

# Upload and create batch
print("Uploading file...")
file = client.files.upload(
    file="test_batch.jsonl", config={"mime_type": "application/jsonl"}
)

print("Creating batch job...")
job = client.batches.create(model="gemini-2.5-flash", src=file.name)
print("Job created:", job.name)

while not job.done:
    print("Waiting for job...", job.state)
    time.sleep(5)
    job = client.batches.get(name=job.name)

print("Job done:", job.state)
print("Job attributes:")
print(dir(job))
if job.dest:
    print("Job Dest attributes:")
    print(dir(job.dest))
    print(job.dest)
else:
    print("Job dest is None")

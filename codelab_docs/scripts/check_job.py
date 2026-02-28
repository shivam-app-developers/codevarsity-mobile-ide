import os
import google.genai as genai
from dotenv import load_dotenv

load_dotenv(".env")
client = genai.Client()
jobs = list(client.batches.list())
if jobs:
    job = jobs[0]
    print(f"EXACT_JOB_ID={job.name}")
    print(f"STATE={job.state}")
    print(f"ERROR={job.error}")
else:
    print("NO_JOBS_FOUND")

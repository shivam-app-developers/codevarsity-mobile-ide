import google.genai as genai
from dotenv import load_dotenv

load_dotenv(".env")
client = genai.Client()
jobs = list(client.batches.list())
if jobs:
    job = jobs[0]
    with open("job_info_clean.txt", "w", encoding="utf-8") as f:
        f.write(f"EXACT_JOB_ID={job.name}\n")
        f.write(f"STATE={job.state}\n")
        f.write(f"ERROR={job.error}\n")
else:
    with open("job_info_clean.txt", "w", encoding="utf-8") as f:
        f.write("NO_JOBS_FOUND\n")

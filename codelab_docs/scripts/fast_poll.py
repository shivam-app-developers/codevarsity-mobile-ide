import google.genai as genai
import time
from dotenv import load_dotenv

load_dotenv(".env")
client = genai.Client()
job_id = "batches/ims8cwvf0qrut2c8ntv5amxes8f7e6w8660z"

print(f"Monitoring {job_id}...")
for i in range(20):
    job = client.batches.get(name=job_id)
    print(f"Status: {job.state}")
    if job.state == "JOB_STATE_SUCCEEDED":
        print("\nReady to fetch! Run the main script.")
        break
    if job.state in ("JOB_STATE_FAILED", "JOB_STATE_CANCELLED"):
        print(f"\nJob Failed! {job.error}")
        break
    time.sleep(15)

import os
import json
from pathlib import Path
from dotenv import load_dotenv

try:
    from google import genai
except ImportError:
    print("Required library not found. Please run: pip install google-genai")
    exit()


def main():
    env_path = Path(__file__).parent / ".env"
    load_dotenv(env_path)

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print(f"Error: GOOGLE_API_KEY not found in {env_path}")
        return

    client = genai.Client(api_key=api_key)

    print("Fetching active batch jobs...")
    try:
        # List batches
        for job in client.batches.list():
            print(f"Job Name: {job.name}, State: {job.state}")
            if job.state in (
                "JOB_STATE_PENDING",
                "JOB_STATE_RUNNING",
                "JOB_STATE_ACTIVE",
            ):
                print(f"Cancelling job: {job.name}...")
                # Note: The SDK might use 'cancel' or 'delete'.
                # According to Gemini API docs, it's often a DELETE request or a specific cancel method.
                # In google-genai, its usually client.batches.delete(name=job.name) to stop it.
                try:
                    # Try cancel first if available, otherwise delete
                    if hasattr(client.batches, "cancel"):
                        client.batches.cancel(name=job.name)
                    else:
                        client.batches.delete(name=job.name)
                    print(f"Successfully requested cancellation for {job.name}")
                except Exception as e:
                    print(f"Failed to cancel {job.name}: {e}")
    except Exception as e:
        print(f"Error listing jobs: {e}")


if __name__ == "__main__":
    main()

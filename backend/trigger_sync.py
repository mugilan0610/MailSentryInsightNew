import requests
import json

url = "http://localhost:8000/api/process"
payload = {
    "email": "mugilanm810@gmail.com",
    "password": "wznb lrob srmd osbm"
}
headers = {
    "Content-Type": "application/json"
}

try:
    print("Triggering Intelligence Sync...")
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json().get('status', 'No status')}")
    if response.json().get('status') == 'success':
        print(f"Successfully processed {response.json().get('count')} emails.")
    else:
        print(f"Error: {response.json().get('message')}")
except Exception as e:
    print(f"Request failed: {e}")

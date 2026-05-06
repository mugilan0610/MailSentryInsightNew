import imaplib
import json
import os

# Test connection with credentials from App.tsx
gmail_user = 'mugilanm810@gmail.com'
gmail_pass = 'wznb lrob srmd osbm'
imap_server = 'imap.gmail.com'

def test_connection():
    try:
        print(f"Connecting to {imap_server}...")
        mail = imaplib.IMAP4_SSL(imap_server)
        print(f"Logging in as {gmail_user}...")
        mail.login(gmail_user, gmail_pass)
        print("Successfully connected!")
        mail.logout()
        return True
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()

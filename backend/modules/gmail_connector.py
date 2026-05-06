import imaplib
import json
import os

class GmailConnector:
    def __init__(self, config_path='config.json'):
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        self.mail = None

    def connect(self):
        try:
            self.mail = imaplib.IMAP4_SSL(self.config['imap_server'])
            # Clean password from any accidental spaces or newlines
            clean_pass = self.config['gmail_pass'].replace(" ", "").strip()
            self.mail.login(self.config['gmail_user'], clean_pass)
            return self.mail
        except Exception as e:
            print(f"Connection Error: {e}")
            return None


    def disconnect(self):
        if self.mail:
            try:
                self.mail.close()
                self.mail.logout()
            except:
                pass

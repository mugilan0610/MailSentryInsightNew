import email
from email.header import decode_header
from .gmail_connector import GmailConnector

class EmailFetcher:
    def __init__(self, connector):
        self.connector = connector

    def fetch_emails(self, limit=50):
        mail = self.connector.connect()
        if not mail:
            return []

        mail.select("inbox")
        _, messages = mail.search(None, "ALL")
        email_ids = messages[0].split()
        
        # Get last N emails
        last_n = email_ids[-limit:]
        fetched_data = []

        for e_id in reversed(last_n):
            try:
                _, msg_data = mail.fetch(e_id, "(RFC822)")
                for response_part in msg_data:
                    if isinstance(response_part, tuple):
                        msg = email.message_from_bytes(response_part[1])
                        subject, encoding = decode_header(msg["Subject"])[0]
                        if isinstance(subject, bytes):
                            subject = subject.decode(encoding if encoding else "utf-8", errors="ignore")
                        
                        sender = msg.get("From")
                        date = msg.get("Date")
                        
                        body = ""
                        if msg.is_multipart():
                            for part in msg.walk():
                                if part.get_content_type() == "text/plain":
                                    body = part.get_payload(decode=True).decode(errors="ignore")
                                    break
                        else:
                            body = msg.get_payload(decode=True).decode(errors="ignore")

                        fetched_data.append({
                            "email_id": e_id.decode(),
                            "sender": sender,
                            "subject": subject,
                            "date": date,
                            "body": body
                        })
            except Exception as e:
                print(f"Error fetching email {e_id}: {e}")
                continue
        
        self.connector.disconnect()
        return fetched_data

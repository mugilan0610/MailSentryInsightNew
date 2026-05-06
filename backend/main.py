from fastapi import FastAPI, HTTPException, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import json
import os
import pandas as pd
from pydantic import BaseModel

# Member 1-5 Modules
from modules.gmail_connector import GmailConnector
from modules.email_fetcher import EmailFetcher
from modules.text_cleaner import TextCleaner
from modules.classifier import EmailClassifier
from modules.parser import EntityParser
from modules.csv_exporter import CSVExporter
from modules.analytics_dashboard import AnalyticsDashboard

app = FastAPI(title="MailSentry Insight Engine v2.0 - PRO")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Core Services
cleaner = TextCleaner()
classifier = EmailClassifier()
parser = EntityParser()
exporter = CSVExporter(output_dir="output/")
analytics = AnalyticsDashboard(output_dir="output/")

class Credentials(BaseModel):
    email: str
    password: str

@app.post("/api/process")
async def process_emails(creds: Credentials):
    try:
        # Use provided credentials
        connector = GmailConnector()
        connector.config['gmail_user'] = creds.email
        connector.config['gmail_pass'] = creds.password
        
        fetcher = EmailFetcher(connector)
        
        # 1. Gmail Integration (Force 50 Emails)
        print(f"DEBUG: Attempting live fetch for {creds.email}...")
        raw_emails = fetcher.fetch_emails(limit=50)
        
        if not raw_emails:
            # If fetch fails, return the SPECIFIC error
            return {
                "status": "error",
                "message": "REAL SYNC FAILED: Google rejected the connection. Please: 1. Enable IMAP in Gmail Settings. 2. Ensure 2FA is ON. 3. Use a fresh App Password."
            }
        
        processed_emails = []
        extracted_entities = []
        
        for mail in raw_emails:
            clean_body = cleaner.clean(mail['body'])
            category = classifier.classify(mail['subject'], clean_body)
            entities = parser.extract(clean_body)
            entities['email_id'] = mail['email_id']
            
            processed_emails.append({
                "email_id": mail['email_id'],
                "sender": mail['sender'],
                "subject": mail['subject'],
                "date": mail['date'],
                "category": category,
                "body_preview": clean_body[:100] + "..."
            })
            extracted_entities.append(entities)
            
        # Persistence
        email_path = exporter.export_emails(processed_emails)
        exporter.export_entities(extracted_entities)
        
        # Generate PNG Reports
        analytics.generate_charts(email_path)
        
        return {
            "status": "success",
            "count": len(processed_emails),
            "emails": processed_emails,
            "entities": extracted_entities
        }
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        return {"status": "error", "message": f"Engine Error: {str(e)}"}

@app.get("/api/download/emails")
async def download_emails():
    path = "output/processed_emails.csv"
    if os.path.exists(path):
        return FileResponse(path, filename="processed_emails.csv", media_type='text/csv')
    raise HTTPException(status_code=404, detail="File not found")

@app.get("/api/download/entities")
async def download_entities():
    path = "output/extracted_entities.csv"
    if os.path.exists(path):
        return FileResponse(path, filename="extracted_entities.csv", media_type='text/csv')
    raise HTTPException(status_code=404, detail="File not found")

@app.get("/api/logs")
async def get_logs():
    email_path = "output/processed_emails.csv"
    entity_path = "output/extracted_entities.csv"
    if not os.path.exists(email_path): return {"emails": []}
    try:
        df_emails = pd.read_csv(email_path)
        if os.path.exists(entity_path):
            df_entities = pd.read_csv(entity_path)
            df_merged = pd.merge(df_emails, df_entities[['email_id', 'phone_number']], on='email_id', how='left')
        else:
            df_merged = df_emails
            df_merged['phone_number'] = None
            
        sender_counts = df_merged['sender'].value_counts().to_dict()
        df_merged['sender_count'] = df_merged['sender'].map(sender_counts)
        
        # Standardize Date/Time Parsing
        def parse_dt(dt_str):
            try:
                # Example: Tue, 05 May 2026 15:02:50 GMT
                parts = str(dt_str).split(' ')
                # Return Date and Time separately
                return f"{parts[1]} {parts[2]} {parts[3]}", f"{parts[4][:5]}"
            except:
                return str(dt_str)[:11], "00:00"

        df_merged['display_date'], df_merged['display_time'] = zip(*df_merged['date'].apply(parse_dt))
        df_merged = df_merged.replace({float('nan'): None})
        return {"emails": df_merged.to_dict(orient="records")}
    except Exception as e:
        return {"emails": [], "error": str(e)}


@app.get("/api/stats")
async def get_stats():
    path = "output/processed_emails.csv"
    if not os.path.exists(path): return {"category_distribution": {}, "total_emails": 0, "top_senders": []}
    try:
        df = pd.read_csv(path)
        df = df.replace({float('nan'): None})
        cat_dist = df['category'].value_counts().to_dict()
        top_senders = df['sender'].value_counts().head(5).reset_index()
        top_senders.columns = ['name', 'value']
        return {
            "category_distribution": cat_dist, 
            "total_emails": len(df),
            "top_senders": top_senders.to_dict(orient="records")
        }
    except Exception as e:
        print(f"Stats Error: {e}")
        return {"category_distribution": {}, "total_emails": 0, "top_senders": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

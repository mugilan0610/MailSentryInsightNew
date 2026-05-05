# MailSentry Insight™ 🛡️
### Enterprise Email Intelligence & Analytics Engine (v2.0)

**MailSentry Insight™** is a high-performance email intelligence platform designed to transform live Gmail inbox data into structured, actionable business insights. Using an advanced **Weighted Intelligence Engine**, it automatically classifies emails, extracts critical entities (like mobile numbers and invoice IDs), and generates real-time analytical reports.

---

## 🚀 Key Features
- **Live Gmail Integration**: Secure IMAP connection using Google App Passwords.
- **Advanced Classification**: Weighted keyword-based engine for Sales Leads, Invoices, Support, HR, and Spam.
- **Entity Extraction**: Automated regex parsing for Phone Numbers, Invoice IDs, and Ticket IDs.
- **Temporal Velocity Analysis**: High-resolution tracking of inbound intelligence over time.
- **Enterprise Dashboard**: Modern glassmorphic React UI with Light/Dark mode toggles.
- **Automated Reporting**: Generates downloadable CSV logs and high-res Matplotlib PNG charts.

---

## 🛠️ Technology Stack
- **Backend**: Python 3.9+, FastAPI (High-performance API).
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **Analytics**: Recharts (Interactive) & Matplotlib (Static PNGs).
- **Data Processing**: Pandas, Regex, IMAPLib.
- **Styling**: Glassmorphism, Modern Dark Mode UI.

---

## 📂 Project Structure
```text
MailSentry_Insight/
├── backend/
│   ├── main.py            # FastAPI Application
│   ├── config.json        # SECURE: Credentials (Ignored in Git)
│   ├── modules/           # Modular Intelligence Engines
│   │   ├── classifier.py  # Weighted scoring logic
│   │   ├── parser.py      # Regex entity extraction
│   │   └── ...            # Other core modules
│   └── output/            # Intelligence CSVs & PNG Charts
└── src/                   # React Frontend Source
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js** (v16+)
- **Python** (v3.9+)
- **Gmail App Password**: [Generate here](https://myaccount.google.com/apppasswords)

### 2. Backend Setup
```powershell
cd backend
pip install fastapi uvicorn pandas matplotlib pydantic requests
# Update backend/config.json with your Gmail and App Password
python main.py
```

### 3. Frontend Setup
```powershell
# Open a new terminal in the root directory
npm install
npm run dev
```

### 4. Access the Dashboard
Open your browser and navigate to:
**[http://localhost:3001/](http://localhost:3001/)**

---

## 🛡️ Security Note
The `backend/config.json` file is listed in `.gitignore` to prevent sensitive credentials from being pushed to public repositories. Always use **Google App Passwords** for secure IMAP authentication.

---

## 👤 Author
**Mugilan M**  
*Lead Intelligence Engineer*  
[GitHub Profile](https://github.com/mugilan0610)

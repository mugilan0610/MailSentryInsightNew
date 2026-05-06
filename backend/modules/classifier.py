class EmailClassifier:
    def __init__(self):
        self.categories = {
            "Invoice": [
                "invoice", "invoice number", "payment due", "due date",
                "billing", "bill", "receipt", "transaction",
                "amount due", "total amount", "paid", "payment received",
                "outstanding balance", "balance due", "gst", "tax invoice",
                "credit card statement", "bank statement",
                "debit transaction", "payment confirmation",
                "order total", "refund processed", "refund initiated",
                "amount credited", "amount debited"
            ],
            "Support": [
                "issue", "error", "problem", "support request",
                "need help", "help required", "unable to",
                "not working", "failed", "bug", "technical issue",
                "complaint", "resolve", "resolution",
                "troubleshoot", "fix this", "system down",
                "login issue", "access denied", "service unavailable",
                "delay in service", "request id", "ticket id"
            ],
            "Sales Lead": [
                "interested", "interested in", "pricing",
                "price details", "quotation", "quote request",
                "request quote", "demo request", "schedule demo",
                "product demo", "buy now", "purchase",
                "subscription plan", "upgrade plan",
                "trial version", "free trial",
                "business inquiry", "partnership",
                "looking for solution", "need product",
                "request information", "more details"
            ],
            "HR": [
                "resume", "cv", "job application",
                "application for", "candidate profile",
                "interview scheduled", "interview invitation",
                "interview confirmation", "shortlisted",
                "hiring", "recruitment", "recruiter",
                "offer letter", "joining date",
                "hr team", "position applied",
                "job role", "vacancy",
                "career opportunity",
                "application status", "selection process"
            ],
            "Internal": [
                "meeting", "team meeting", "schedule meeting",
                "project update", "status update",
                "daily report", "weekly report",
                "internal discussion", "sync up",
                "deadline", "submission",
                "review meeting", "feedback",
                "client update", "progress report",
                "task assigned", "task completed",
                "reminder", "follow up",
                "notes from meeting"
            ],
            "Spam": [
                "unsubscribe", "click here", "limited offer", "act now",
                "exclusive deal", "hurry up", "offer valid",
                "special discount", "sale ends", "free gift",
                "win now", "congratulations", "selected winner",
                "best deal", "lowest price", "guaranteed",
                "risk free", "instant access", "no cost",
                "zero investment", "earn money",
                "utm_", "affiliate", "ref=", "tracking",
                "campaign=", "source=", "medium=",
                "noreply", "no-reply", "donotreply",
                "bulk hiring", "walk-in drive",
                "mass recruitment", "guaranteed job",
                "easy selection", "instant joining",
                "no interview required",
                "good morning", "good evening",
                "best wishes", "greetings",
                "season's greetings", "happy birthday",
                "verify account", "update account",
                "urgent action required", "suspended account",
                "click to verify", "security alert"
            ]
        }
        
        self.strong_signals = [
            "unsubscribe", "click here", "verify account", "urgent action", "limited offer"
        ]

    def classify(self, subject, body):
        text = (str(subject) + " " + str(body)).lower()
        scores = {cat: 0 for cat in self.categories}
        
        # Weighted Scoring Logic
        for category, keywords in self.categories.items():
            for kw in keywords:
                if kw in text:
                    # Normal match
                    scores[category] += 1
                    # Double weight if it's a strong signal
                    if kw in self.strong_signals:
                        scores[category] += 2
        
        # Handle "Internal" as a base category if no strong matches
        best_cat = max(scores, key=scores.get)
        if scores[best_cat] == 0:
            return "Internal"
            
        return best_cat

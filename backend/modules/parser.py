import re

class EntityParser:
    def __init__(self):
        self.patterns = {
            "phone_number": r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b',
            "invoice_id": r'INV-\d{4,8}',
            "ticket_id": r'TCK-\d{4,8}',
            "amount": r'[₹$]\s?\d+(?:,\d{3})*(?:\.\d{2})?',
            "order_id": r'ORD-\d{6,10}',
            "email_address": r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        }

    def extract(self, text):
        results = {}
        for entity, pattern in self.patterns.items():
            matches = re.findall(pattern, text)
            results[entity] = matches[0] if matches else None
        return results

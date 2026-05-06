import re

class TextCleaner:
    @staticmethod
    def clean(text):
        if not text:
            return ""
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        # Convert to lowercase
        text = text.lower()
        # Remove special characters (keep alphanumeric and basic punctuation)
        text = re.sub(r'[^a-z0-9\s₹$]', '', text)
        # Normalize whitespace
        text = " ".join(text.split())
        return text

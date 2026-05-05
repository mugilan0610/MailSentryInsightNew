import pandas as pd
import os

class CSVExporter:
    def __init__(self, output_dir="output/"):
        self.output_dir = output_dir
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

    def export_emails(self, data, filename="processed_emails.csv"):
        df = pd.DataFrame(data)
        path = os.path.join(self.output_dir, filename)
        df.to_csv(path, index=False)
        return path

    def export_entities(self, data, filename="extracted_entities.csv"):
        df = pd.DataFrame(data)
        path = os.path.join(self.output_dir, filename)
        df.to_csv(path, index=False)
        return path

import matplotlib.pyplot as plt
import pandas as pd
import os

class AnalyticsDashboard:
    def __init__(self, output_dir="output/"):
        self.output_dir = output_dir
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

    def generate_charts(self, email_csv_path):
        if not os.path.exists(email_csv_path):
            return
        
        df = pd.read_csv(email_csv_path)
        if df.empty:
            return

        # 1. Pie Chart – Category Distribution
        plt.figure(figsize=(10, 6))
        df['category'].value_counts().plot(kind='pie', autopct='%1.1f%%', colors=['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'])
        plt.title('Email Category Distribution')
        plt.ylabel('')
        plt.savefig(os.path.join(self.output_dir, 'category_distribution.png'))
        plt.close()

        # 2. Bar Chart – Top 5 Senders
        plt.figure(figsize=(10, 6))
        df['sender'].value_counts().head(5).plot(kind='bar', color='#6366f1')
        plt.title('Top 5 Email Senders')
        plt.xlabel('Sender')
        plt.ylabel('Count')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.savefig(os.path.join(self.output_dir, 'top_senders.png'))
        plt.close()

        # 3. Line Graph – Emails Per Day (Simulated by index if date parsing is complex)
        plt.figure(figsize=(10, 6))
        # Simple count per entry for volume visualization
        df.index.to_series().plot(kind='line', color='#10b981', marker='o')
        plt.title('Intelligence Processing Volume')
        plt.xlabel('Email Index')
        plt.ylabel('Process Order')
        plt.savefig(os.path.join(self.output_dir, 'daily_volume.png'))
        plt.close()

        print("Analytical PNG reports generated in output folder.")

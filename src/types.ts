export enum ViewType {
  DASHBOARD = 'dashboard',
  EMAILS = 'emails',
  ENTITIES = 'entities',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings',
  SUPPORT = 'support'
}

export interface EmailLog {
  id: string;
  sender: string;
  senderInitials: string;
  subject: string;
  category: 'Internal' | 'Sales Lead' | 'Support' | 'Invoice' | 'HR' | 'Spam';
  date: string;
  body?: string;
  senderEmail?: string;
}

export interface ExtractedEntity {
  id: string;
  emailId: string;
  phoneNumber: string;
  invoiceId: string;
  ticketId: string;
  amount: string;
  orderId: string;
  status: 'Verified' | 'Pending' | 'Flagged';
}

export interface StatData {
  label: string;
  value: string;
  change: string;
  type: 'primary' | 'secondary' | 'tertiary' | 'error';
  icon: string;
}

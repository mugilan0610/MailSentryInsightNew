import { EmailLog, ExtractedEntity, StatData } from './types';

export const STATS: StatData[] = [
  { label: 'Total Emails', value: '1,284,592', change: '+12.5%', type: 'primary', icon: 'Mail' },
  { label: 'Sales Leads', value: '42,910', change: '+4.2%', type: 'secondary', icon: 'TrendingUp' },
  { label: 'Invoices', value: '8,642', change: '-2.1%', type: 'tertiary', icon: 'FileText' },
  { label: 'Support Tickets', value: '312', change: '+18%', type: 'error', icon: 'AlertCircle' },
];

export const EMAIL_LOGS: EmailLog[] = [
  {
    id: '#MS-9021',
    sender: 'Sarah Miller',
    senderInitials: 'SM',
    subject: 'Q4 Security Audit Proposal',
    category: 'Internal',
    date: 'Oct 19, 14:20'
  } as EmailLog,
  {
    id: '#MS-8944',
    sender: 'Accounts Global',
    senderInitials: 'AG',
    subject: 'Urgent: Invoice INV-2023-004',
    category: 'Invoice',
    date: 'Oct 19, 11:30',
    senderEmail: 'accounts@global-nexus.com',
    body: 'Dear Procurement Team, \n\nPlease find the attached invoice for the software services rendered during September. The total amount due is $14,500.00. Please confirm receipt of this invoice. If you have any questions regarding the line items, please contact us at +1 (555) 012-3456 or reference ID number 99-8877665. \n\nRegards,\nNexus Accounts Dept.'
  } as EmailLog,
  {
    id: '#MS-8712',
    sender: 'Robert Harrison',
    senderInitials: 'RH',
    subject: 'New Lead from Enterprise Tech Expo',
    category: 'Sales Lead',
    date: 'Oct 18, 09:12'
  } as EmailLog,
  {
    id: '#MS-8601',
    sender: 'Mail Admin',
    senderInitials: 'MA',
    subject: '[Alert] Undelivered Mail Delivery Subsystem',
    category: 'Spam',
    date: 'Oct 18, 08:45'
  } as EmailLog,
];

export const ENTITIES: ExtractedEntity[] = [
  { id: '1', emailId: '#MS-99210', phoneNumber: '+1 (555) 012-9842', invoiceId: 'INV-2024-001', ticketId: 'TKT-7721', amount: '$1,240.00', orderId: 'ORD_A109_XZ', status: 'Verified' },
  { id: '2', emailId: '#MS-99211', phoneNumber: '+44 20 7946 0958', invoiceId: 'INV-2024-002', ticketId: 'TKT-7722', amount: '£890.50', orderId: 'ORD_B210_YX', status: 'Pending' },
  { id: '3', emailId: '#MS-99212', phoneNumber: '+49 30 901820', invoiceId: 'INV-2024-003', ticketId: 'TKT-7723', amount: '€3,120.00', orderId: 'ORD_C311_ZY', status: 'Verified' },
  { id: '4', emailId: '#MS-99213', phoneNumber: '+1 (555) 902-1144', invoiceId: 'INV-2024-004', ticketId: 'TKT-7724', amount: '$450.25', orderId: 'ORD_D412_WV', status: 'Flagged' },
  { id: '5', emailId: '#MS-99214', phoneNumber: '+81 3 1234 5678', invoiceId: 'INV-2024-005', ticketId: 'TKT-7725', amount: '¥12,400', orderId: 'ORD_E513_UT', status: 'Verified' },
  { id: '6', emailId: '#MS-99215', phoneNumber: '+1 (555) 445-9833', invoiceId: 'INV-2024-006', ticketId: 'TKT-7726', amount: '$2,100.00', orderId: 'ORD_F614_SR', status: 'Pending' },
];

export const TOP_SENDERS = [
  { email: 'marketing@corp.com', count: '42,502', percentage: 95, color: 'var(--color-primary)' },
  { email: 'no-reply@invoices.net', count: '28,110', percentage: 65, color: 'var(--color-secondary)' },
  { email: 'support@platform.io', count: '19,403', percentage: 45, color: 'var(--color-tertiary)' },
  { email: 'hr-automated@internal.com', count: '12,094', percentage: 30, color: 'var(--color-outline)' },
  { email: 'newsletter@industry.com', count: '8,521', percentage: 20, color: 'var(--color-outline-variant)' },
];

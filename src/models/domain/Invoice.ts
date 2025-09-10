export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'CANCELLED' | 'OVERDUE';

export interface IInvoice {
    id: string;
    number: string;
    status: InvoiceStatus;
    issueDate: Date;
    dueDate: Date;
    subtotal: string;
    taxAmount: string;
    total: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
    taxProfileId: string;
}

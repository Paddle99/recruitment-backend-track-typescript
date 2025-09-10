export class InvoiceDTO {
    id!: string;
    number!: string;
    status!: 'DRAFT' | 'SENT' | 'PAID' | 'CANCELLED' | 'OVERDUE';
    issueDate!: string;
    dueDate!: string;
    subtotal!: string;
    taxAmount!: string;
    total!: string;
    description?: string | null;
    taxProfileId!: string;
    createdAt!: string;
    updatedAt!: string;
}

export class InvoiceCreateDTO {
    number!: string;
    status?: 'DRAFT' | 'SENT' | 'PAID' | 'CANCELLED' | 'OVERDUE';
    issueDate!: string;
    dueDate!: string;
    subtotal!: string;
    taxAmount!: string;
    total!: string;
    description?: string | null;
    taxProfileId!: string;
}

export class InvoiceUpdateDTO {
    status?: 'DRAFT' | 'SENT' | 'PAID' | 'CANCELLED' | 'OVERDUE';
    issueDate?: string;
    dueDate?: string;
    subtotal?: string;
    taxAmount?: string;
    total?: string;
    description?: string | null;
}

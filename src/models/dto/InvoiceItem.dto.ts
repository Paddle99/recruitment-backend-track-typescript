export class InvoiceItemDTO {
    id!: string;
    description!: string;
    quantity!: string;
    unitPrice!: string;
    lineTotal!: string;
    invoiceId!: string;
}

export class InvoiceItemCreateDTO {
    description!: string;
    quantity!: string;
    unitPrice!: string;
    lineTotal!: string;
    invoiceId!: string;
}
export class InvoiceItemUpdateDTO {
    description?: string;
    quantity?: string;
    unitPrice?: string;
}

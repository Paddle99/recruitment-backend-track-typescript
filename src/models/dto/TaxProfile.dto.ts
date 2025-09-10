export class TaxProfileDTO {
    id!: string;
    name!: string;
    taxId!: string;
    address!: string;
    city!: string;
    postalCode!: string;
    userId!: string;
    createdAt!: string;
    updatedAt!: string;
}

export class TaxProfileCreateDTO {
    name!: string;
    taxId!: string;
    address!: string;
    city!: string;
    postalCode!: string;
    userId!: string;
}

export class TaxProfileUpdateDTO {
    name?: string;
    taxId?: string;
    address?: string;
    city?: string;
    postalCode?: string;
}

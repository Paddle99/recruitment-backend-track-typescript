import { BaseRepository } from './BaseRepository.js';
import prisma from '../prisma.js';
import type { InvoiceItem } from '@prisma/client';
import type { IBaseRepository } from './interfaces/BaseRepository.interface.js';

export class InvoiceItemRepository
    extends BaseRepository<typeof prisma.invoiceItem, InvoiceItem>
    implements IBaseRepository<InvoiceItem>
{
    constructor() {
        super(prisma.invoiceItem);
    }
}

export default InvoiceItemRepository;

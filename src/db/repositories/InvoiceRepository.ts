import { BaseRepository } from './BaseRepository.js';
import prisma from '../prisma.js';
import type { Invoice } from '@prisma/client';
import type { IBaseRepository } from './interfaces/BaseRepository.interface.js';

export class InvoiceRepository
    extends BaseRepository<typeof prisma.invoice, Invoice>
    implements IBaseRepository<Invoice>
{
    constructor() {
        super(prisma.invoice);
    }
}

export default InvoiceRepository;

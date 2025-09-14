import type { IBaseRepository } from '@db/repositories/interfaces/BaseRepository.interface.js';
import { InvoiceRepository } from '@db/repositories/InvoiceRepository.js';
import type {
    InvoiceCreateDTO,
    InvoicePaginationDTO,
    InvoiceUpdateDTO,
} from '@dto/Invoice.dto.js';
import type { Invoice } from '@prisma/client';

export class InvoiceService {
    private invoiceRepository: IBaseRepository<Invoice>;

    constructor() {
        this.invoiceRepository = new InvoiceRepository();
    }

    public async getAllInvoices() {
        return this.invoiceRepository.findMany();
    }

    public async getInvoiceById(id: string) {
        return this.invoiceRepository.findUnique({ where: { id } });
    }

    public async createInvoice(data: InvoiceCreateDTO) {
        return this.invoiceRepository.create(data);
    }

    public async updateInvoice(id: string, data: InvoiceUpdateDTO) {
        return this.invoiceRepository.update({ where: { id }, data });
    }

    public async deleteInvoice(id: string) {
        return this.invoiceRepository.delete({ where: { id } });
    }

    public async getInvoicePaginated(paginationArgs: InvoicePaginationDTO) {
        const { skip, take, ...filters } = paginationArgs;

        const where = Object.entries(filters).reduce(
            (acc, [key, value]) => {
                if (!value) return acc;

                if (key === 'status') {
                    acc[key] = { equals: value };
                } else if (key === 'taxProfileId') {
                    acc[key] = { equals: value };
                } else if (key === 'number') {
                    acc[key] = {
                        contains: value as string,
                        mode: 'insensitive',
                    };
                }

                return acc;
            },
            {} as Record<string, unknown>
        );

        return this.invoiceRepository.findManyWithPagination({
            skip,
            take,
            where,
        });
    }
}

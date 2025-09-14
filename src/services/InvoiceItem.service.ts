import type { IBaseRepository } from '@db/repositories/interfaces/BaseRepository.interface.js';
import { InvoiceItemRepository } from '@db/repositories/InvoiceItemRepository.js';
import type {
    InvoiceItemCreateDTO,
    InvoiceItemPaginationDTO,
    InvoiceItemUpdateDTO,
} from '@dto/InvoiceItem.dto.js';
import type { InvoiceItem } from '@prisma/client';

export class InvoiceItemService {
    private invoiceItemRepository: IBaseRepository<InvoiceItem>;

    constructor() {
        this.invoiceItemRepository = new InvoiceItemRepository();
    }

    public async getAllInvoiceItems() {
        return this.invoiceItemRepository.findMany();
    }

    public async getInvoiceItemById(id: string) {
        return this.invoiceItemRepository.findUnique({ where: { id } });
    }

    public async createInvoiceItem(data: InvoiceItemCreateDTO) {
        return this.invoiceItemRepository.create(data);
    }

    public async updateInvoiceItem(id: string, data: InvoiceItemUpdateDTO) {
        return this.invoiceItemRepository.update({ where: { id }, data });
    }

    public async deleteInvoiceItem(id: string) {
        return this.invoiceItemRepository.delete({ where: { id } });
    }

    public async getInvoiceItemsPaginated(
        paginationArgs: InvoiceItemPaginationDTO
    ) {
        const { skip, take, ...filters } = paginationArgs;

        const where = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value)
                acc[key] = { contains: value as string, mode: 'insensitive' };
            return acc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as any);

        return this.invoiceItemRepository.findManyWithPagination({
            skip,
            take,
            where,
        });
    }
}

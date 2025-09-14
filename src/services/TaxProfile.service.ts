import type { IBaseRepository } from '@db/repositories/interfaces/BaseRepository.interface.js';
import { TaxProfileRepository } from '@db/repositories/TaxProfileRepository.js';
import type {
    TaxProfileCreateDTO,
    TaxProfilePaginationDTO,
    TaxProfileUpdateDTO,
} from '@dto/TaxProfile.dto.js';
import type { TaxProfile } from '@prisma/client';

export class TaxProfileService {
    private taxProfileRepository: IBaseRepository<TaxProfile>;

    constructor() {
        this.taxProfileRepository = new TaxProfileRepository();
    }

    public async getAllTaxProfiles() {
        return this.taxProfileRepository.findMany();
    }

    public async getTaxProfileById(id: string) {
        return this.taxProfileRepository.findUnique({ where: { id } });
    }

    public async createTaxProfile(data: TaxProfileCreateDTO) {
        return this.taxProfileRepository.create(data);
    }

    public async updateTaxProfile(id: string, data: TaxProfileUpdateDTO) {
        return this.taxProfileRepository.update({ where: { id }, data });
    }

    public async deleteTaxProfile(id: string) {
        return this.taxProfileRepository.delete({ where: { id } });
    }

    public async getTaxProfilesPaginated(
        paginationArgs: TaxProfilePaginationDTO
    ) {
        const { skip, take, ...filters } = paginationArgs;

        const where = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value)
                acc[key] = { contains: value as string, mode: 'insensitive' };
            return acc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as any);

        return this.taxProfileRepository.findManyWithPagination({
            skip,
            take,
            where,
        });
    }
}

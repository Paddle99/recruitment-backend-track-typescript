import { BaseRepository } from './BaseRepository.js';
import prisma from '../prisma.js';
import type { TaxProfile } from '@prisma/client';
import type { IBaseRepository } from './interfaces/BaseRepository.interface.js';

export class TaxProfileRepository
    extends BaseRepository<typeof prisma.taxProfile, TaxProfile>
    implements IBaseRepository<TaxProfile>
{
    constructor() {
        super(prisma.taxProfile);
    }
}

export default TaxProfileRepository;

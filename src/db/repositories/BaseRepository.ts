import { PrismaClient } from '@prisma/client';

class BaseRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    //TODO: add crud methods for the model
}

export default BaseRepository;

import type { IBaseRepository } from './interfaces/BaseRepository.interface.js';
import type { PrismaDelegate } from './interfaces/PrismaDelegate.type.js';

export class BaseRepository<TDelegate extends PrismaDelegate<TModel>, TModel> implements IBaseRepository<TModel> {
    protected delegate: TDelegate;

    constructor(delegate: TDelegate) {
        this.delegate = delegate;
    }

    async findMany(args?: Parameters<TDelegate['findMany']>[0]): Promise<TModel[]> {
        return this.delegate.findMany(args);
    }

    async findUnique(args: Parameters<TDelegate['findUnique']>[0]): Promise<TModel | null> {
        return this.delegate.findUnique(args);
    }

    async create(data: Parameters<TDelegate['create']>[0]['data']): Promise<TModel> {
        return this.delegate.create({ data });
    }

    async update(args: {
        where: Parameters<TDelegate['update']>[0]['where'];
        data: Parameters<TDelegate['update']>[0]['data'];
    }): Promise<TModel> {
        return this.delegate.update(args);
    }

    async delete(args: { where: Parameters<TDelegate['delete']>[0]['where'] }): Promise<TModel> {
        return this.delegate.delete(args);
    }
}

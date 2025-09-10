export interface IBaseRepository<T, TCreate, TUpdate> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: TCreate): Promise<T>;
    update(id: string, data: TUpdate): Promise<T>;
    delete(id: string): Promise<T>;
}

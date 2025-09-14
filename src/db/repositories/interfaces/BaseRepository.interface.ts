/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseRepository<TModel> {
    findMany(args?: any): Promise<TModel[]>;
    findUnique(args: any): Promise<TModel | null>;
    create(data: any): Promise<TModel>;
    update(args: { where: any; data: any }): Promise<TModel>;
    delete(args: { where: any }): Promise<TModel>;
    findManyWithPagination(args?: {
        where?: any;
        skip?: number;
        take?: number;
        orderBy?: any;
    }): Promise<{ data: TModel[]; total: number }>;
}

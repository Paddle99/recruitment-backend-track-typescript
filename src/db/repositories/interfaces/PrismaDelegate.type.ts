/* eslint-disable @typescript-eslint/no-explicit-any */
export type PrismaDelegate<TModel> = {
    findMany(args?: any): Promise<TModel[]>;
    findUnique(args: any): Promise<TModel | null>;
    create(args: { data: TModel }): Promise<TModel>;
    update(args: { where: any; data: Partial<TModel> }): Promise<TModel>;
    delete(args: { where: any }): Promise<TModel>;
    count?(args?: { where?: any }): Promise<number>;
};

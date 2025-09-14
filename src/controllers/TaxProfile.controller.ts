import type { Request, Response, NextFunction } from 'express';
import type { TaxProfileService } from '@services/TaxProfile.service.js';
import {
    TaxProfileCreateSchema,
    TaxProfileUpdateSchema,
    TaxProfileSchema,
    TaxProfilesListSchema,
    TaxProfilePaginationSchema,
    type TaxProfilesPaginatedResponseDTO,
    TaxProfilesPaginatedResponseSchema,
} from '@dto/TaxProfile.dto.js';

export class TaxProfileController {
    constructor(private taxProfileService: TaxProfileService) {}

    public getAllTaxProfiles = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const profiles = await this.taxProfileService.getAllTaxProfiles();
            const result = TaxProfilesListSchema.parse(profiles);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public getTaxProfileById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const profile = await this.taxProfileService.getTaxProfileById(id);
            const result = TaxProfileSchema.parse(profile);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    public createTaxProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = TaxProfileCreateSchema.parse(req.body);
            const profile = await this.taxProfileService.createTaxProfile(data);
            return res.status(201).json(TaxProfileSchema.parse(profile));
        } catch (err) {
            next(err);
        }
    };

    public updateTaxProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const data = TaxProfileUpdateSchema.parse(req.body);
            const profile = await this.taxProfileService.updateTaxProfile(
                id,
                data
            );
            return res.status(200).json(TaxProfileSchema.parse(profile));
        } catch (err) {
            next(err);
        }
    };

    public deleteTaxProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const profile = await this.taxProfileService.deleteTaxProfile(id);
            return res.status(200).json(TaxProfileSchema.parse(profile));
        } catch (err) {
            next(err);
        }
    };

    public getTaxProfilesWithPagination = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = TaxProfilePaginationSchema.parse(req.query);

            const { data, total } =
                await this.taxProfileService.getTaxProfilesPaginated(query);

            const response: TaxProfilesPaginatedResponseDTO =
                TaxProfilesPaginatedResponseSchema.parse({
                    total,
                    data,
                    skip: query.skip,
                    take: query.take,
                });

            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };
}

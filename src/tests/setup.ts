import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { afterAll, beforeAll } from 'vitest';
import { ControllerFactory } from '@controllers/ControllerFactory.js';
import { UserRoute } from '@routes/User.route.js';
import { errorHandler } from '@middlewares/ServerError.js';

export const prisma = new PrismaClient({
    datasources: {
        db: {
            url:
                process.env.TEST_DATABASE_URL ||
                'postgresql://user:password@localhost:5433/test_invoice_management?schema=public',
        },
    },
});

export async function cleanDatabase() {
    const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

    for (const { tablename } of tablenames) {
        if (tablename !== '_prisma_migrations') {
            await prisma.$executeRawUnsafe(
                `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
            );
        }
    }
}

export function createTestServer() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(compression());

    const controllerFactory = new ControllerFactory();
    const userController = controllerFactory.createUserController();
    const userRoute = new UserRoute(userController);

    app.use(userRoute.path, userRoute.router);

    app.use(errorHandler);

    return app;
}

beforeAll(async () => {
    await cleanDatabase();
});

afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
});

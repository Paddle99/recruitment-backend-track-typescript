import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import prisma from './db/prisma.ts';

class Server {
    private app: express.Application;
    private port: number;
    private originCors: string = 'http://localhost:3000';

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers();
        this.initializeRoutes();
        this.checkDbConnection();
    }

    private initializeMiddlewares(): void {
        // express middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // cors for cross-origin requests
        this.app.use(cors({ credentials: true, origin: this.originCors }));

        // helmet for security headers
        this.app.use(helmet());

        // morgan for logging requests
        this.app.use(morgan('dev'));

        // compression for response
        this.app.use(compression());
    }

    private initializeControllers(): void {}

    private initializeRoutes(): void {}

    private async checkDbConnection(): Promise<void> {
        try {
            await prisma.$queryRaw`SELECT 1`;
            console.log('Database connection is OK');
        } catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1);
        }
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default Server;

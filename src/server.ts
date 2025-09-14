import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import prisma from '@db/prisma.js';
import { ControllerFactory } from '@controllers/ControllerFactory.js';
import { UserRoute } from '@routes/User.route.js';
import swaggerUi from 'swagger-ui-express';
import openApiDoc from '@docs/openApi.js';
import { TaxProfileRoute } from '@routes/TaxProfile.route.js';
import { InvoiceRoute } from '@routes/Invoice.route.js';
import { InvoiceItemRoute } from '@routes/InvoiceItem.route.js';
import { errorHandler } from '@middlewares/ServerError.js';

class Server {
    private app: express.Application;
    private port: number;
    private originCors: string = 'http://localhost:3000';

    private controllerFactory = new ControllerFactory();

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllersAndRoutes();
        this.initializeErrorHandling();
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

        // swagger for API documentation
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));
    }

    private initializeControllersAndRoutes(): void {
        const userController = this.controllerFactory.createUserController();

        const taxProfileController =
            this.controllerFactory.createTaxProfileController();

        const invoiceController =
            this.controllerFactory.createInvoiceController();

        const invoiceItemController =
            this.controllerFactory.createInvoiceItemController();

        const userRoute = new UserRoute(userController);
        const taxProfileRoute = new TaxProfileRoute(taxProfileController);
        const invoiceRoute = new InvoiceRoute(invoiceController);
        const invoiceItemRoute = new InvoiceItemRoute(invoiceItemController);

        this.app.use(userRoute.path, userRoute.router);
        this.app.use(taxProfileRoute.path, taxProfileRoute.router);
        this.app.use(invoiceRoute.path, invoiceRoute.router);
        this.app.use(invoiceItemRoute.path, invoiceItemRoute.router);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

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
            console.log(
                `API docs available at http://localhost:${this.port}/api-docs`
            );
        });
    }
}

export default Server;

import { UserService } from '@services/User.service.js';
import { UserController } from './User.controller.js';
import { TaxProfileService } from '@services/TaxProfile.service.js';
import { TaxProfileController } from './TaxProfile.controller.js';
import { InvoiceService } from '@services/Invoice.service.js';
import { InvoiceController } from './Invoice.controller.js';
import { InvoiceItemService } from '@services/InvoiceItem.service.js';
import { InvoiceItemController } from './InvoiceItem.controller.js';

interface IControllerFactory {
    createUserController(): UserController;
}

export class ControllerFactory implements IControllerFactory {
    createUserController() {
        const userService = new UserService();
        const userController = new UserController(userService);
        return userController;
    }

    createTaxProfileController() {
        const taxProfileService = new TaxProfileService();
        const taxProfileController = new TaxProfileController(
            taxProfileService
        );
        return taxProfileController;
    }

    createInvoiceController() {
        const invoiceService = new InvoiceService();
        const invoiceController = new InvoiceController(invoiceService);
        return invoiceController;
    }

    createInvoiceItemController() {
        const invoiceItemService = new InvoiceItemService();
        const invoiceItemController = new InvoiceItemController(
            invoiceItemService
        );
        return invoiceItemController;
    }
}

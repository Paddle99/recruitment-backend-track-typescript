import { createDocument } from 'zod-openapi';
import { userDocs } from './users.docs.js';
import { userComponents } from './users.docs.js';
import { taxProfileComponents, taxProfileDocs } from './taxProfiles.docs.js';
import { invoiceItemComponents, invoiceItemDocs } from './invoiceItem.docs.js';
import { invoiceComponents, invoiceDocs } from './invoice.docs.js';

const openApiSpec = createDocument({
    openapi: '3.1.0',
    info: {
        title: 'API docs',
        version: '1.0.0',
        description: 'API documentation generated with Zod and zod-openapi',
    },
    components: {
        schemas: {
            ...userComponents.schemas,
            ...taxProfileComponents.schemas,
            ...invoiceItemComponents.schemas,
            ...invoiceComponents.schemas,
        },
    },
    paths: {
        ...userDocs.getAllUsersPath,
        ...userDocs.getUserByIdPath,
        ...userDocs.getUserByEmailPath,
        ...userDocs.getUsersPaginatedPath,
        ...userDocs.createUserPath,
        ...userDocs.updateUserPath,
        ...userDocs.deleteUserPath,

        ...taxProfileDocs.getAllTaxProfilesPath,
        ...taxProfileDocs.getTaxProfileByIdPath,
        ...taxProfileDocs.getTaxProfilesPaginatedPath,
        ...taxProfileDocs.createTaxProfilePath,
        ...taxProfileDocs.updateTaxProfilePath,
        ...taxProfileDocs.deleteTaxProfilePath,

        ...invoiceDocs.getAllInvoicesPath,
        ...invoiceDocs.getInvoiceByIdPath,
        ...invoiceDocs.getInvoicesPaginatedPath,
        ...invoiceDocs.createInvoicePath,
        ...invoiceDocs.updateInvoicePath,
        ...invoiceDocs.deleteInvoicePath,

        ...invoiceItemDocs.getAllInvoiceItemsPath,
        ...invoiceItemDocs.getInvoiceItemByIdPath,
        ...invoiceItemDocs.getInvoiceItemsPaginatedPath,
        ...invoiceItemDocs.createInvoiceItemPath,
        ...invoiceItemDocs.updateInvoiceItemPath,
        ...invoiceItemDocs.deleteInvoiceItemPath,
    },
});

export default openApiSpec;

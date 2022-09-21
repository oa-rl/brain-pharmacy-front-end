import { Customer, ProductCombination } from "./inventory.models";
import { Main } from "./main";

export interface SaleInvoice extends Main {
    autorization: string,
    date: Date,
    customerId: number,
    customer: Customer
    saleInvoiceDetails: Array<SaleInvoiceDetails>
}

export interface SaleInvoiceDetails extends Main {
    saleInvoiceId?: number,
    productCombinationId: number,
    productCombination?: ProductCombination,
    productRowTemp?: string,
    amount: number,
    price: number,
    priceWithOutTax: number,
    tax: number
}

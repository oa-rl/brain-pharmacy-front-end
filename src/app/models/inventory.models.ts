import { Main } from "./main";

export interface Product extends Main {
    name: string,
}

export interface Size extends Main {
    name: string
}

export interface MedicalHouse extends Main {
    name: string
}

export interface ProductCombination extends Main {
    product?: Product,
    productId: number,
    size?: Size,
    sizeId: number,
    amountSize: number,
    medicalHouse?: MedicalHouse,
    medicalHouseId: number,
    saleFor?: SaleFor,
    saleForId: number,
    amountSale: number,
    price: number
}

export interface SaleFor extends Main {
    name: string
}
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
    productId: number,
    sizeId: number,
    amountSize: number,
    medicalHouseId: number,
    saleForId: number,
    amountSale: number,
    price: number
}

export interface SaleFor extends Main {
    name: string
}
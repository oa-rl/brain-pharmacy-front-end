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
    amount: number,
    medicalHouseId: number,
    saleForId: number,
    saleAmount: number,
    price: number
}
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
    price: number,
    joinName?: string,
    existence?: number
}

export interface SaleFor extends Main {
    name: string
}

export interface Customer extends Main {
    name: string,
    lastName: string,
    nit: string,
    email: string,
    address: string,
    phone1: string,
    phone2: string,
    fullName?: string
}

export interface ProductMovement extends Main {
    productCombinationId: number,
    productCombination: ProductCombination,
    expirationDate: Date,
    quantity: number,
    operationTypeId: number
    operationType: OperationType,
    movementDate: Date
}

export interface OperationType extends Main {
  sign: string,
  description: string
}
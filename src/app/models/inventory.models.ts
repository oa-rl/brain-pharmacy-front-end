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
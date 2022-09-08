import { Main } from "./main";

export interface Company extends Main {
    name: string,
    address: string,
    nit: string
}

export interface Branch extends Main {
    companyId: number,
    name: string,
    address: string
}

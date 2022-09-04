import { Main } from "./main";

export interface Company extends Main {
    name: string,
    address: string,
    nit: string
}

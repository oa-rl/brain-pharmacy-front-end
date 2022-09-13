import { Main } from "./main";

export interface User extends Main {
    name: string,
    lastName: string,
    email: string,
    password: string
    profileId: number,
}
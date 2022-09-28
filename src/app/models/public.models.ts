import { Main } from "./main"

export interface Login extends Main {
    email: string,
    password: string
}
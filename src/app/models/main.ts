export interface Main {
    id?: number
}

export interface ListData<T> {
    count: number,
    data: T,
    pageIndex: number,
    pageSize: number
}

export interface BreadCrumbs {
    name: string,
    path?: string
}

export interface Profile extends Main {
    name: string
}

export interface ObjData<T> {
    data: T,
    ok: boolean,
    statusCode: number
}

export interface DecodedToken {
    exp: number,
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' : string,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress' : string,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name' : string,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid' : string,
}
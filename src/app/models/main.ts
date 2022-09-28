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
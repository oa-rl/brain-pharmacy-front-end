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
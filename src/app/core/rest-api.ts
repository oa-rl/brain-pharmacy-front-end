import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {isNil} from 'lodash';
import { ListData, Main } from '../models/main';
import { LocalStorageService } from 'ngx-localstorage';

export class Api<T extends Main>  {
    private _url = 'https://localhost:7212/api';
    private headers: HttpHeaders;
    constructor(
        public _http: HttpClient,
        public _area: string,
        private _storage: LocalStorageService
    ) {
        this.headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD',
            'Access-Control-Allow-Headers':
                `Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control`,
            'Content-Type': 'Application/json',
            'Authorization' : this._storage.get('token') || ''
        });
    }

    find(where?: string, subR?: any): Observable<ListData<Array<T>> > {
        return this._http.get<ListData<Array<T>>>(`${this._url}/${this._area}${isNil(subR) ? '' :
            `/${subR}`}${isNil(where) ? '' : `?${where}`}`, { headers: this.headers });
    }

    findById(_id: number, subR?: string): Observable<T> {
        return this._http.get<T>(`${this._url}/${this._area}/${_id}${subR ? '/' + subR : ''}`, { headers: this.headers });
    }

    insert(obj: T, subR?: any): Observable<T> {
        return this._http.post<T>(`${this._url}/${this._area}${!isNil(subR) ? `/${subR}` : ''}`,
            obj, { headers: this.headers });
    }

    update(obj: T, subR?: any): Observable<T> {
        return this._http
            .put<T>(`${this._url}/${this._area}${!isNil(subR) ? `/${subR}` : ''}`, obj, { headers: this.headers });
    }

    nativeUpdate(obj: T, subR?: any): Observable<T> {
        return this._http
            .put<T>(`${this._url}/${this._area}/${obj.id}${!isNil(subR) ? `/${subR}` : ''}`, obj, { headers: this.headers });
    }

    delete(id: number): Observable<T> {
        return this._http.delete<T>(`${this._url}/${this._area}/${id}`, { headers: this.headers });
    }

    get url() {
        return this._url;
    }
}
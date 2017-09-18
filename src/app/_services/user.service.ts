import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { api_root } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

/*
    getAll() {
        return this.http.get(api_root + '/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(api_root + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
*/
    create(user: User) {
        return this.http.post(api_root + 'auth/register', user, this.jwt())
            .map((response: Response) => {
                const resp = response.json();
                console.log(resp);
            });
    }
/*
    update(user: User) {
        return this.http.put(api_root + '/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(api_root + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
*/
    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (currentUser && currentUser.token) {

            const headers = new Headers;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            // headers.append('Authorization', 'Bearer ' + currentUser.access_token);

            return new RequestOptions({ headers: headers });
        // }
    }
}

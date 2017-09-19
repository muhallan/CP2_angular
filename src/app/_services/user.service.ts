import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User, api_root } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    create(user: User) {
        return this.http.post(api_root + 'auth/register', user, this.jwt())
            .map((response: Response) => {
                const resp = response.json();
                console.log(resp);
            });
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        const headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return new RequestOptions({ headers: headers });
    }
}

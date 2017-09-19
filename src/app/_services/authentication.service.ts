import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { api_root } from '../_models/index';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    jsonHeaders() {
        const headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const reqOptions = new RequestOptions({headers: headers});

        return reqOptions;
    }

    login(email: string, password: string) {
        // const data = { 'email': email, 'password': password };
        return this.http.post(api_root + 'auth/login', JSON.stringify({ email: email, password: password }), this.jsonHeaders())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log(response);
                const user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userEmail', email);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

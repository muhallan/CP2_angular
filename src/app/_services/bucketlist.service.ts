import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Bucketlist, BucketlistJson, api_root } from '../_models/index';

@Injectable()
export class BucketlistService {
    private bucketlists_url = api_root + 'bucketlists';

    constructor(private _http: HttpClient) { }

    getBucketlists(): Observable<BucketlistJson> {
        return this._http.get<BucketlistJson>(this.bucketlists_url,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.errorResponse);
    }

    /*
    getBucketlist(id: number): Observable<Bucketlist> {
        return this.getBucketlists()
            .map((bucketlists: Bucketlist[]) => bucketlists.find(b => b.bucketlistId === id));
    }*/

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }

    private jwt(): HttpHeaders {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {

            const headers = new HttpHeaders;
            // headers.set('Content-Type', 'application/json');
            // headers.append('Accept', 'application/json');
            headers.set('Authorization', 'Bearer ' + currentUser.access_token);

            return headers;
        }
    }

    private getAuthToken(): string {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            const token = 'Bearer ' + currentUser.access_token;
            return token;
        }
    }

    private errorResponse (err) {
        // console.log(err.error);
        const body = JSON.parse(err.error);
        const message = body.message;
        // this.alertService.error(message);

        // console.log(body.message);
        return Observable.throw(message);
    }

}

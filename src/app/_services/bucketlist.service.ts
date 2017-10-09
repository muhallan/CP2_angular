import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Bucketlist, BucketlistJson, BucketlistItem } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class BucketlistService {
    private bucketlists_url = environment.api_root + 'bucketlists';
    private bucketlist_single_url = environment.api_root + 'bucketlists/';

    constructor(private _http: HttpClient, private otherHttp: Http) { }

    // fetch the all bucketlists with their items from the API
    getBucketlists(query: string, page: number, limit: number): Observable<BucketlistJson> {
        return this._http.get<BucketlistJson>(this.bucketlists_url + '?q=' + query + '&limit=' + limit + '&page=' + page,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('All: '))
            .catch(this.errorResponse);
    }

    // create headers to use with the Http module while sending a post
    jsonHeaders() {
        const headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            headers.set('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            // append the user's access token as an authorization header
            headers.set('Authorization', 'Bearer ' + currentUser.access_token);
        }
        const reqOptions = new RequestOptions({headers: headers});

        return reqOptions;
    }

    // add a new bucketlist to the API
    addBucketlist(name: string): Observable<Bucketlist> {
        return this.otherHttp.post(this.bucketlists_url, JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlist: Bucketlist = response.json();
                return bucketlist;
            });
    }

    // add a new bucketlist item to the API
    addBucketlistItem(name: string, id: number): Observable<BucketlistItem> {
        return this.otherHttp.post(this.bucketlist_single_url + id + '/items', JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {

                const bucketlistItem: BucketlistItem = response.json();
                return bucketlistItem;

            });
    }

    // set the done property to a bucketlist item
    toggleBucketlistItemDone(name: string, id: number, done: string, item_id: number): Observable<BucketlistItem> {
        return this.otherHttp.put(this.bucketlist_single_url + id + '/items/' + item_id, JSON.stringify({ name: name, done: done }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlistItem: BucketlistItem = response.json();
                return bucketlistItem;
            });
    }


    // retrieve a single bucketlist identified by an id
    getBucketlist(id: number): Observable<Bucketlist> {
        return this._http.get<Bucketlist>(this.bucketlist_single_url + id,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('All single: ' + JSON.stringify(data)))
            .catch(this.errorResponse);
    }

    // delete a single bucketlist
    deleteBucketlist(id: number): Observable<Bucketlist> {
        return this._http.delete<Bucketlist>(this.bucketlist_single_url + id,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('Message: ' + JSON.stringify(data)))
            .catch(this.errorResponse);
    }

    // edit the name of a given bucketlist
    editBucketlist(id: number, name: string): Observable<Bucketlist> {
        return this.otherHttp.put(this.bucketlist_single_url + id, JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlist: Bucketlist = response.json();
                return bucketlist;
            });
    }

    // edit the name of a bucketlist item
    editBucketlistItem(itemId: number, bucketId: number, name: string): Observable<BucketlistItem> {
        return this.otherHttp.put(this.bucketlist_single_url + bucketId + '/items/' + itemId, JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlistItem: BucketlistItem = response.json();
                return bucketlistItem;
            });
    }

    // delete a given bucketlist item
    deleteBucketlistItem(itemId: number, bucketId: number): Observable<BucketlistItem> {
        return this._http.delete<BucketlistItem>(this.bucketlist_single_url + bucketId + '/items/' + itemId,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('Message: ' + JSON.stringify(data)))
            .catch(this.errorResponse);
    }

    // get the authorization header used in the HttpClient module
    private getAuthToken(): string {
        // get the jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            // add the user's token as saved in local storage
            const token = 'Bearer ' + currentUser.access_token;
            return token;
        }
    }

    // method to parse error messages returned
    private errorResponse (err) {
        if (err.status === 404) {
            return Observable.throw('404');
        }
        // parse an Observable error message
        const body = JSON.parse(err.error);
        const message = body.message;
        return Observable.throw(message);
    }

}

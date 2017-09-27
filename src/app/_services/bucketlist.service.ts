import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Bucketlist, BucketlistJson, api_root, BucketlistItem } from '../_models/index';

@Injectable()
export class BucketlistService {
    private bucketlists_url = api_root + 'bucketlists';
    private bucketlist_single_url = api_root + 'bucketlists/';

    constructor(private _http: HttpClient, private otherHttp: Http) { }

    getBucketlists(query: string, page: number, limit: number): Observable<BucketlistJson> {
        return this._http.get<BucketlistJson>(this.bucketlists_url + '?q=' + query + '&limit=' + limit + '&page=' + page,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('All: '))
            .catch(this.errorResponse);
    }
/*
    getBucketlistsSearch(query: string, page: number, limit: number): Observable<BucketlistJson> {
        return this._http.get<BucketlistJson>(
            this.bucketlists_url + '?q=' + query + '&limit=' + limit + '&page=' + page,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('All: '))
            .catch(this.errorResponse);
    }
*/
    jsonHeaders() {
        const headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            headers.set('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.set('Authorization', 'Bearer ' + currentUser.access_token);
        }
        const reqOptions = new RequestOptions({headers: headers});

        return reqOptions;
    }

    addBucketlist(name: string): Observable<Bucketlist> {
        return this.otherHttp.post(this.bucketlists_url, JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlist: Bucketlist = response.json();
                console.log(bucketlist);
                return bucketlist;
            });
    }

    addBucketlistItem(name: string, id: number): Observable<BucketlistItem> {
        return this.otherHttp.post(this.bucketlist_single_url + id + '/items', JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {

                const bucketlistItem: BucketlistItem = response.json();
                console.log(bucketlistItem);
                return bucketlistItem;

            });
    }

    toggleBucketlistItemDone(name: string, id: number, done: string, item_id: number): Observable<BucketlistItem> {
        return this.otherHttp.put(this.bucketlist_single_url + id + '/items/' + item_id, JSON.stringify({ name: name, done: done }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlistItem: BucketlistItem = response.json();
                console.log(bucketlistItem);
                return bucketlistItem;
            });
    }


    getBucketlist(id: number): Observable<Bucketlist> {
        return this._http.get<Bucketlist>(this.bucketlist_single_url + id,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('All single: ' + JSON.stringify(data)))
            .catch(this.errorResponse);
    }

    deleteBucketlist(id: number): Observable<Bucketlist> {
        return this._http.delete<Bucketlist>(this.bucketlist_single_url + id,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('Message: ' + JSON.stringify(data)))
            .catch(this.errorResponse);
    }

    editBucketlist(id: number, name: string): Observable<Bucketlist> {
        return this.otherHttp.put(this.bucketlist_single_url + id, JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlist: Bucketlist = response.json();
                console.log(bucketlist);
                return bucketlist;
            });
    }

    editBucketlistItem(itemId: number, bucketId: number, name: string): Observable<BucketlistItem> {
        return this.otherHttp.put(this.bucketlist_single_url + bucketId + '/items/' + itemId, JSON.stringify({ name: name }),
                 this.jsonHeaders())
            .map((response: Response) => {
                const bucketlistItem: BucketlistItem = response.json();
                // bucketlist.items = [];
                console.log(bucketlistItem);
                return bucketlistItem;
            });
    }

    deleteBucketlistItem(itemId: number, bucketId: number): Observable<BucketlistItem> {
        return this._http.delete<BucketlistItem>(this.bucketlist_single_url + bucketId + '/items/' + itemId,
                {headers: new HttpHeaders().set('Authorization', this.getAuthToken()), } )
            .do(data => console.log('Message: ' + JSON.stringify(data)))
            .catch(this.errorResponse);
    }

    private getAuthToken(): string {
        // get the jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            const token = 'Bearer ' + currentUser.access_token;
            return token;
        }
    }

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

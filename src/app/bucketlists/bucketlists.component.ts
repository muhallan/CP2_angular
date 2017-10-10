import { Component, OnInit } from '@angular/core';
import { Bucketlist, BucketlistJson } from '../_models/index';
import { BucketlistService } from '../_services/index';
import { AlertService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import * as _ from 'underscore';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { DeleteBucketlistService } from '../modal-delete-bucketlist/modal-delete-bucketlist.component';
import { EditBucketlistService } from '../modal-edit-bucketlist/modal-edit-bucketlist.component';

@Component({
  selector: 'app-bucketlists',
  templateUrl: './bucketlists.component.html',
  styleUrls: ['./bucketlists.component.css']
})
export class BucketlistsComponent implements OnInit {

  returnUrl: string;
  bucketlists: Bucketlist[] = [];
  closeResult: string;
  enableSearch = true;
  page_limit = 5;
  search_text = '';
  total_items: number;
  total_pages: number;
  calcIndex: number;
  current_page = 1;
  pages: number[];
  empty_message = 'It looks like you\'ve not added anything, yet. Start by adding a new bucket.';
  loading = true;

  constructor(private bucketlistService: BucketlistService,
    private alertService: AlertService, private router: Router,
    private deleteService: DeleteBucketlistService,
    private editService: EditBucketlistService) {  }

  ngOnInit(): void {

    // fetch the bucketlists for the logged in user
    this.bucketlistService.getBucketlists(this.search_text, this.current_page, this.page_limit)
            .subscribe(
              data => {
                // stop the loading
                this.loading = false;
                const bucketlists_json: BucketlistJson = data;
                // loop through the returned json and add bucketlists to a array
                for (const bucketlistJson of bucketlists_json.items) {
                    this.bucketlists.push(bucketlistJson);
                }
                // for use in navigation
                this.total_items = bucketlists_json.total_items;
                this.total_pages = bucketlists_json.total_pages;

                this.calcIndex = (this.page_limit * (this.current_page - 1));
                this.pages = _.range(1, bucketlists_json.total_pages + 1);
            },
              err => {
                this.loading = false;
                let message: string;
                // check for expired token
                if (err === 'Expired token. Please login to get a new token') {
                    message = 'Your session has expired. Please login again.';

                    // get return url from route parameters or default to '/'
                    this.returnUrl = 'login';
                    this.router.navigate([this.returnUrl]);
                } else {
                  message = err;
                }
                // display the error message
                this.alertService.error(message);
            });
  }

  // method called when a page number changes to display items on that page
  getAPIBucketlists(page_num: number) {
    this.current_page = page_num;
    this.bucketlistService.getBucketlists(this.search_text, this.current_page, this.page_limit)
    .subscribe(
      data => {
        this.bucketlists.length = 0;
        const bucketlists_json: BucketlistJson = data;
        for (const bucketlistJson of bucketlists_json.items) {
            this.bucketlists.push(bucketlistJson);
        }
        this.total_items = bucketlists_json.total_items;
        this.total_pages = bucketlists_json.total_pages;

        this.calcIndex = (this.page_limit * (this.current_page - 1));
        this.pages = _.range(1, bucketlists_json.total_pages + 1);
    },
      err => {
        let message: string;
        if (err === 'Expired token. Please login to get a new token') {
            message = 'Your session has expired. Please login again.';

            // get return url from route parameters or default to '/'
            this.returnUrl = 'login';
            this.router.navigate([this.returnUrl]);
        } else {
          message = err;
        }
        this.alertService.error(message);

    });
  }

  // method called with an updated number of bucketlists to display per page
  getPageLimit(limit: number) {
    this.page_limit = limit;
    this.bucketlistService.getBucketlists(this.search_text, this.current_page, this.page_limit)
    .subscribe(
      data => {
        this.bucketlists.length = 0;
        const bucketlists_json: BucketlistJson = data;
        for (const bucketlistJson of bucketlists_json.items) {
            this.bucketlists.push(bucketlistJson);
        }
        this.total_items = bucketlists_json.total_items;
        this.total_pages = bucketlists_json.total_pages;

        this.calcIndex = (this.page_limit * (this.current_page - 1));
        this.pages = _.range(1, bucketlists_json.total_pages + 1);
    },
      err => {
        let message: string;
        if (err === 'Expired token. Please login to get a new token') {
            message = 'Your session has expired. Please login again.';

            // get return url from route parameters or default to '/'
            this.returnUrl = 'login';
            this.router.navigate([this.returnUrl]);
        } else {
          message = err;
        }
        this.alertService.error(message);

    });
  }

  // retrieve bucketlists that contain the passed query in the name
  searchBucketlists(query: string) {
    this.search_text = query;
    this.bucketlistService.getBucketlists(query, this.current_page, this.page_limit)
    .subscribe(
      data => {
        this.bucketlists.length = 0;
        const bucketlists_json: BucketlistJson = data;
        for (const bucketlistJson of bucketlists_json.items) {
            this.bucketlists.push(bucketlistJson);
        }

        if (bucketlists_json.items.length === 0) {
          this.empty_message = 'No results found for buckets with name \'' + query + '\'';
        }

        this.total_items = bucketlists_json.total_items;
        this.total_pages = bucketlists_json.total_pages;

        this.calcIndex = (this.page_limit * (this.current_page - 1));
        this.pages = _.range(1, bucketlists_json.total_pages + 1);
    },
      err => {
        let message: string;
        if (err === 'Expired token. Please login to get a new token') {
            message = 'Your session has expired. Please login again.';

            // get return url from route parameters or default to '/'
            this.returnUrl = 'login';
            this.router.navigate([this.returnUrl]);
        } else {
          message = err;
        }
        this.alertService.error(message);

    });
  }

  // used to edit the bucket's name using a modal
  editBucketlist(bucket: Bucketlist, bucketlists: Bucketlist[]) {
    const editPromise = this.editService.edit(bucket, bucketlists);
    const newObservable = Observable.fromPromise(editPromise);
    newObservable.subscribe(
      (res) => {
        if (res === true) {
          console.log('allowed.');
        } else {
          console.log('prevented.');
        }
      },
      (reason) => {
        console.log('Dismissed ' + reason);
      }
    );
  }

  // display a modal to confirm whether a bucket should be deleted or not
  confirmDelete(bucket: Bucketlist) {
    const modalPromise = this.deleteService.confirm(bucket);
    const newObservable = Observable.fromPromise(modalPromise);
    newObservable.subscribe(
      (res) => {
        if (res === true) {
          this.bucketlistService.deleteBucketlist(bucket.id)
          .subscribe(
            data => {
              this.bucketlists = this.bucketlists.filter((deleted) => deleted.id !== bucket.id);
          },
            err => {
              let message: string;
              if (err === 'Expired token. Please login to get a new token') {
                  message = 'Your session has expired. Please login again.';

                  // get return url from route parameters or default to '/'
                  this.returnUrl = 'login';
                  this.router.navigate([this.returnUrl]);
              } else {
                const body = JSON.parse(err._body);
                message = body.message;
              }
              this.alertService.error(message);

          });
        } else {
          console.log('prevented.');
        }
      },
      (reason) => {
        console.log('Dismissed ' + reason);
      }
    );
  }

}

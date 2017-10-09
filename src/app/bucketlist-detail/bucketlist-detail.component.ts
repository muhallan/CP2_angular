import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { BucketlistService, AlertService } from '../_services/index';
import { Bucketlist, BucketlistItem } from '../_models/index';
import { EditBucketlistItemService } from '../modal-edit-bucketlist-item/modal-edit-bucketlist-item.component';
import { DeleteBucketlistItemService } from '../modal-delete-bucketlist-item/modal-delete-bucketlist-item.component';

@Component({
  selector: 'app-bucketlist-detail',
  templateUrl: './bucketlist-detail.component.html',
  styleUrls: ['./bucketlist-detail.component.css']
})
export class BucketlistDetailComponent implements OnInit {

  bucketlistName: string;
  errorMessage: string;
  bucketlist: Bucketlist;
  bucketlistItems: BucketlistItem[] = [];
  doneItems: BucketlistItem[] = [];
  pendingItems: BucketlistItem[] = [];
  returnUrl: string;
  newItem = '';
  loading = true;

  constructor(private _route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private bucketlistService: BucketlistService,
    private editService: EditBucketlistItemService,
    private deleteService: DeleteBucketlistItemService) {
  }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.getBucketlist(id);
  }

  getBucketlist(id: number) {
    this.bucketlistService.getBucketlist(id).subscribe(
      bucketlist => {
        this.loading = false;
        this.bucketlist = bucketlist;
        this.bucketlistName = this.bucketlist.name;
        this.bucketlistItems = this.bucketlist.items;

        for (const item of this.bucketlistItems) {
          if (item.done === true) {
            this.doneItems.push(item);
          } else {
            this.pendingItems.push(item);
          }
        }
      },
      error => {
        this.loading = false;
        let message: string;
        this.errorMessage = <any>error;

        if (error === 'Expired token. Please login to get a new token') {
            message = 'Your session has expired. Please login again.';

            this.returnUrl = 'login';
            this.router.navigate([this.returnUrl]);
        } else {
          // TODO do this on all the functions
          if (error === '404') {
            // get return url from route parameters or default to '/'
            this.returnUrl = 'page-not-found';
            this.router.navigate([this.returnUrl]);
            this.alertService.error('This bucket does not exist');
          } else {
            this.alertService.error(error);
          }
        }
      });
  }

  addBucketlistItem(name: string, id: number) {
    if (name === '') {
      const error = 'Bucketlist name cannot be empty';
      this.alertService.error(error);
    } else {
      this.bucketlistService.addBucketlistItem(name, id)
      .subscribe(
        data => {
          const bucketlistItem: BucketlistItem = data;
          this.bucketlistItems.push(bucketlistItem);
          this.pendingItems.push(bucketlistItem);
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
    }
    this.newItem = null;
  }

  toggleDone(item: BucketlistItem) {
    const newStatus: string = (!item.done).toString();
    this.bucketlistService.toggleBucketlistItemDone(item.name, item.belongs_to, newStatus, item.id)
    .subscribe(
      data => {
        const bucketlistItem: BucketlistItem = data;

        // check the done status and determine which array to move the item to
        if (item.done === true) {
          this.doneItems = this.doneItems.filter((done) => done.id !== item.id);
          this.pendingItems.push(bucketlistItem);
        } else {
          this.pendingItems = this.pendingItems.filter((undone) => undone.id !== item.id);
          this.doneItems.push(bucketlistItem);
        }

        // update the main array with the changed object
        const index = this.bucketlistItems.indexOf(item);
        this.bucketlistItems[index] = bucketlistItem;
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
  }

  editBucketlistItem(bucketlistItem: BucketlistItem, bucketlistItems: BucketlistItem[]) {
    const editPromise = this.editService.edit(bucketlistItem, bucketlistItems);
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

  confirmDeleteItem(bucketItem: BucketlistItem) {
    const modalPromise = this.deleteService.confirm(bucketItem);
    const newObservable = Observable.fromPromise(modalPromise);
    newObservable.subscribe(
      (res) => {
        if (res === true) {
          this.bucketlistService.deleteBucketlistItem(bucketItem.id, bucketItem.belongs_to)
          .subscribe(
            data => {

              // check the done status and determine which array to remove the item from
              if (bucketItem.done === true) {
                this.doneItems = this.doneItems.filter((deleted) => deleted.id !== bucketItem.id);
              } else {
                this.pendingItems = this.pendingItems.filter((deleted) => deleted.id !== bucketItem.id);
              }

              // update the deleted item from the main array
              this.bucketlistItems = this.bucketlistItems.filter((deleted) => deleted.id !== bucketItem.id);
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

  onBack(): void {
    this.router.navigate(['/bucketlists']);
  }

}

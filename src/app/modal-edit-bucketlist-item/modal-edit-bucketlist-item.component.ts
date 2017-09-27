import { Component, OnInit, Input, ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BucketlistItem } from '../_models/index';
import { BucketlistService, AlertService } from '../_services/index';

@Component({
  selector: 'app-modal-edit-bucketlist-item',
  templateUrl: './modal-edit-bucketlist-item.component.html',
  styleUrls: ['./modal-edit-bucketlist-item.component.css']
})
export class ModalEditBucketlistItemComponent implements OnInit {

  @Input() bucketItemEditName: string;
  @Input() bucketlistItems: BucketlistItem[] = [];
  returnUrl: string;

  constructor(public activeModal: NgbActiveModal, public changeRef: ChangeDetectorRef,
    private router: Router,
    private alertService: AlertService,
    private modalService: NgbModal,
    private bucketlistService: BucketlistService) {
  }

  ngOnInit() {
  }

  editBucketlistItemName(bucketlistItem: BucketlistItem, bucketlistItemsGot: BucketlistItem[]) {

    this.bucketlistItems = bucketlistItemsGot;

    if (this.bucketItemEditName === '') {
      const error = 'Bucketlist item\'s name cannot be empty';
      this.alertService.error(error);
    } else {
      this.bucketlistService.editBucketlistItem(bucketlistItem.id, bucketlistItem.belongs_to, this.bucketItemEditName)
      .subscribe(
        data => {
          const bucketlistItemEdited: BucketlistItem = data;

          // update the main array with the changed object
          const index = this.bucketlistItems.indexOf(bucketlistItem);
          this.bucketlistItems[index] = bucketlistItemEdited;

          this.activeModal.close();

      },
        err => {
          console.log(err);
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
          this.activeModal.close();

      });
    }
  }
}

@Injectable()
export class EditBucketlistItemService {

  constructor(private modalService: NgbModal) {}

  public edit(bucketItem: BucketlistItem, bucketItems: BucketlistItem[]) {
    const modalRef = this.modalService.open(ModalEditBucketlistItemComponent);
    modalRef.componentInstance.title = 'Edit bucketlist item\'s name';
    modalRef.componentInstance.bucketItemEditName = bucketItem.name;
    modalRef.componentInstance.bucketlistItem = bucketItem;
    modalRef.componentInstance.bucketlistItemsAll = bucketItems;
    modalRef.componentInstance.changeRef.markForCheck();
    return modalRef.result;
  }

}

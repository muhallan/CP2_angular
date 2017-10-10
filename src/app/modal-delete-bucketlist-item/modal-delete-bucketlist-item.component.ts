import { Component, OnInit, Input, ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BucketlistItem } from '../_models/index';

@Component({
  selector: 'app-modal-delete-bucketlist-item',
  templateUrl: './modal-delete-bucketlist-item.component.html',
  styleUrls: ['./modal-delete-bucketlist-item.component.css']
})
export class ModalDeleteBucketlistItemComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

}

@Injectable()
export class DeleteBucketlistItemService {

  constructor(private modalService: NgbModal) {}

  // used to create a modal for deleting a bucketlist item
  public confirm(bucketItem: BucketlistItem) {
    const modalRef = this.modalService.open(ModalDeleteBucketlistItemComponent);
    modalRef.componentInstance.title = 'Confirm delete';
    modalRef.componentInstance.message = 'Do you want to delete this bucketlist item: "' + bucketItem.name + '"';
    modalRef.componentInstance.changeRef.markForCheck();
    return modalRef.result;
  }

}

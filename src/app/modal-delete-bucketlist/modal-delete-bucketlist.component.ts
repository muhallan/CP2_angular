import { Component, OnInit, Input, ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bucketlist } from '../_models/index';

@Component({
  selector: 'app-modal-delete-bucketlist',
  templateUrl: './modal-delete-bucketlist.component.html',
  styleUrls: ['./modal-delete-bucketlist.component.css']
})
export class ModalDeleteBucketlistComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }
}

@Injectable()
export class DeleteBucketlistService {

  constructor(private modalService: NgbModal) {}

  public confirm(bucket: Bucketlist) {
    const modalRef = this.modalService.open(ModalDeleteBucketlistComponent);
    modalRef.componentInstance.title = 'Confirm delete';
    modalRef.componentInstance.message = 'Do you want to delete this bucket: "' + bucket.name + '"';
    modalRef.componentInstance.changeRef.markForCheck();
    return modalRef.result;
  }

}

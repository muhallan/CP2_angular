import { Component, OnInit, Input, ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bucketlist } from '../_models/index';
import { BucketlistService, AlertService } from '../_services/index';

@Component({
  selector: 'app-modal-edit-bucketlist',
  templateUrl: './modal-edit-bucketlist.component.html',
  styleUrls: ['./modal-edit-bucketlist.component.css']
})
export class ModalEditBucketlistComponent implements OnInit {

  @Input() bucketEditName: string;
  @Input() bucketlists: Bucketlist[] = [];
  closeResult: string;
  returnUrl: string;

  constructor(public activeModal: NgbActiveModal, public changeRef: ChangeDetectorRef,
    private router: Router,
    private alertService: AlertService,
    private modalService: NgbModal,
    private bucketlistService: BucketlistService) {
  }

  ngOnInit() {
  }

  // display the modal for edit and call the service to carry out the edit
  editBucketlistName(bucket: Bucketlist, bucketlistsGot: Bucketlist[]) {

    this.bucketlists = bucketlistsGot;

    if (this.bucketEditName === '') {
      const error = 'Bucketlist name cannot be empty';
      this.alertService.error(error);
    } else {
      this.bucketlistService.editBucketlist(bucket.id, this.bucketEditName)
      .subscribe(
        data => {
          const bucketlistEdited: Bucketlist = data;

          // update the main array with the changed object
          const index = this.bucketlists.indexOf(bucket);
          this.bucketlists[index] = bucketlistEdited;

          this.activeModal.close();

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
          // display an error message
          this.alertService.error(message);
          this.activeModal.close();

      });
    }
  }
}

// create a service that displays the modal
@Injectable()
export class EditBucketlistService {

  constructor(private modalService: NgbModal) {}

  public edit(bucket: Bucketlist, buckets: Bucketlist[]) {
    const modalRef = this.modalService.open(ModalEditBucketlistComponent);
    modalRef.componentInstance.title = 'Edit bucket\'s name';
    modalRef.componentInstance.bucketEditName = bucket.name;
    modalRef.componentInstance.bucketlist = bucket;
    modalRef.componentInstance.bucketlistsAll = buckets;
    modalRef.componentInstance.changeRef.markForCheck();
    return modalRef.result;
  }

}

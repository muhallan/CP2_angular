import { Component, Input, EventEmitter } from '@angular/core';
import { AlertService, BucketlistService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Bucketlist } from '../_models/index';

@Component({
  selector: 'app-add-bucketlist',
  templateUrl: './add-bucketlist.component.html',
  styleUrls: ['./add-bucketlist.component.css']
})
export class AddBucketlistComponent {

  returnUrl: string;
  newBucketlist = '';

  @Input()
  public newbucketlists: Bucketlist[] = [];

  constructor(private alertService: AlertService, private bucketlistService: BucketlistService, private router: Router) { }

  addBucketlist(name: string) {

    if (name === '') {
      const error = 'Bucketlist name cannot be empty';
      this.alertService.error(error);
    } else {
      this.bucketlistService.addBucketlist(name)
      .subscribe(
        data => {
          const bucketlist: Bucketlist = data;
          this.newbucketlists.push(bucketlist);
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

    this.newBucketlist = null;
  }

}

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

  // to input the already fetched bucketlists that will be appended to
  @Input()
  public newbucketlists: Bucketlist[] = [];

  // input the page limit selected by the user so that the newly added bucket doesn't exceed the limit
  @Input()
  pageLimit: number;

  // inject the BucketlistService dependency to communicate with the API
  constructor(private alertService: AlertService, private bucketlistService: BucketlistService,
     private router: Router) { }

  addBucketlist(name: string) {

    if (name === '') {
      const error = 'Bucketlist name cannot be empty';
      this.alertService.error(error);
    } else {
      // call the addBucketlist method of the service and pass it a name
      this.bucketlistService.addBucketlist(name)
      .subscribe(
        data => {
          // return the newly added bucket and add it to the top of the bucketlists array
          const bucketlist: Bucketlist = data;
          this.newbucketlists.unshift(bucketlist);

          // if the resulting bucketlists are more than the page limit, remove the last item
          if (this.newbucketlists.length > this.pageLimit) {
            this.newbucketlists.pop();
          }
      },
        err => {
          let message: string;
          // if the token expired, display the message
          if (err === 'Expired token. Please login to get a new token') {
              message = 'Your session has expired. Please login again.';

              // get return url from route parameters or default to '/'
              this.returnUrl = 'login';
              this.router.navigate([this.returnUrl]);
          } else {
            // display the error message got from the API
            const body = JSON.parse(err._body);
            message = body.message;
          }
          this.alertService.error(message);

      });
    }

    this.newBucketlist = null;
  }

}

import { Component, Output, EventEmitter } from '@angular/core';
import { AlertService, BucketlistService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bucketlist',
  templateUrl: './add-bucketlist.component.html',
  styleUrls: ['./add-bucketlist.component.css']
})
export class AddBucketlistComponent {

  returnUrl: string;

  constructor(private alertService: AlertService, private _productService: BucketlistService, private router: Router) { }
/*
  newBucketlist: string;

  @Output()
  newBucketlistName: EventEmitter<string> = new EventEmitter<string>();
*/
  addBucketlist(name: string) {
    console.log(name);

    if (name === '') {
      const error = 'Bucketlist name cannot be empty';
      this.alertService.error(error);
    } else {
        this._productService.addBucketlist(name)
        .subscribe(
          data => {
            /*
            const bucketlists_json: BucketlistJson = data;
            for (const bucketlistJson of bucketlists_json.items) {
                this.bucketlists.push(bucketlistJson);
            }
            */
            console.log(data);
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
              message = err;
            }
            this.alertService.error(message);

        });
    }
  }

}

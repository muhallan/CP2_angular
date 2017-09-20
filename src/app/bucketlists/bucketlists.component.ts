import { Component, OnInit } from '@angular/core';
import { Bucketlist, BucketlistJson } from '../_models/index';
import { BucketlistService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucketlists',
  templateUrl: './bucketlists.component.html',
  styleUrls: ['./bucketlists.component.css']
})
export class BucketlistsComponent implements OnInit {

  pageTitle = 'My Bucketlists';
  returnUrl: string;
  user_email: string;
  bucketlists: Bucketlist[] = [];

  constructor(private _productService: BucketlistService, private authenticationService: AuthenticationService,
    private alertService: AlertService, private router: Router) {  }

  ngOnInit(): void {

    const currentUser = localStorage.getItem('userEmail');
    console.log(currentUser);
    this.user_email = currentUser;

    this._productService.getBucketlists()
            .subscribe(
              data => {
                const bucketlists_json: BucketlistJson = data;
                for (const bucketlistJson of bucketlists_json.items) {
                    this.bucketlists.push(bucketlistJson);
                }

                console.log(this.bucketlists);
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

  logout() {
    this.returnUrl = 'login';
    this.router.navigate([this.returnUrl]);
    this.authenticationService.logout();
  }

}

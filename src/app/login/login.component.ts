import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model = {
        email: '',
        password: ''
    };

    user: any;
    error: string;

    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(email: string, password: string) {
        this.loading = true;
        this.authenticationService.login(email, password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.user = data;
                },
                (err: HttpErrorResponse) => {
                  if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    this.error = 'An error occurred. Please try again';
                    this.alertService.error(this.error);
                    this.loading = false;
                  } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    if (err.status === 401) {
                        this.error = 'Unknown email or password';
                    } else if (err.status === 500) {
                        this.error = 'An internal server error occurred';
                    } else {
                        this.error = 'An error has occurred';
                    }
                    // display the error
                    this.alertService.error(this.error);
                    this.loading = false;
                  }
                });

    }
}

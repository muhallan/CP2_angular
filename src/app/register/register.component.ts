import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    response: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

        register(model) {
        this.loading = true;
        this.userService.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                    this.response = data;
                },
                err => {
                    const body = JSON.parse(err._body);
                    const message = body.message;
                    this.alertService.error(message);
                    this.loading = false;
                });
    }
}

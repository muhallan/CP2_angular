import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../_services/index';


@Injectable()
export class BucketlistDetailGuard implements CanActivate {

  constructor(private _router: Router, private alertService: AlertService) { }

  canActivate(
    route: ActivatedRouteSnapshot): boolean {

      const id = +route.url[1].path;

      // check if the passed id is a number or it's greater than 1
      if (isNaN(id) || id < 1) {
        // display an alert message of an invalid id
        const message = 'Invalid bucketlist Id';
        this.alertService.error(message);
        this._router.navigate(['/page-not-found']);
        return false;
      }
      // if everything checks out, allow access to the route
      return true;
  }
}

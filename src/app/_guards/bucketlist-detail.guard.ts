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
      if (isNaN(id) || id < 1) {
        const message = 'Invalid bucketlist Id';
        alert(message);
        // this.alertService.error(message);
        this._router.navigate(['/bucketlists']);
        return false;
      }
      return true;
  }
}

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuardService', () => {
    let mockSnapshot: any;
    mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [ AuthGuard,
            {provide: RouterStateSnapshot, useValue: mockSnapshot} ],
          imports: [RouterTestingModule]
        });
      });

      it('checks if a user is valid',
        // inject your guard service AND Router
        async(inject([AuthGuard, Router], (auth, router) => {
          // add a spy
          spyOn(router, 'navigate');
          expect(auth.canActivate(new ActivatedRouteSnapshot(),
            TestBed.get(RouterStateSnapshot))).toBeFalsy();
          expect(router.navigate).toHaveBeenCalled();
        })
      ));
    });

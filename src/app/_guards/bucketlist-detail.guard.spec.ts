import { TestBed, async, inject } from '@angular/core/testing';

import { Type } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router, RouterStateSnapshot, ParamMap, ActivatedRouteSnapshot,
  UrlSegment, Params, Data, Route
} from '@angular/router';
import { BucketlistDetailGuard } from './bucketlist-detail.guard';
import { Observable } from 'RxJs';
import { AlertService } from '../_services/index';

describe('BucketlistDetailGuard', () => {
  let mockSnapshot: MockActivatedRouteSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketlistDetailGuard,
        { provide: AlertService, useClass: MockAlertService },
        { provide: MockActivatedRouteSnapshot }],
      imports: [RouterTestingModule]
    });
  });

  beforeEach(async(() => {
    mockSnapshot = new MockActivatedRouteSnapshot;
  }));

  it('should be created', inject([BucketlistDetailGuard], (guard: BucketlistDetailGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('checks if invalid bucketlist id is prevented',
      // inject your guard service AND Router
      async(inject([BucketlistDetailGuard, Router], (bucketGuard, router) => {
        const mockUrl = new MockUrlSegment();
        mockUrl.path = 'invalid';
        mockSnapshot.url.push(mockUrl);

        // spy on the router method
        spyOn(router, 'navigate');
        expect(bucketGuard.canActivate(mockSnapshot)).toBeFalsy();
        expect(router.navigate).toHaveBeenCalled();
      })
    ));

  it('checks if valid bucketlist id is accepted',
      // inject your guard service AND Router
      async(inject([BucketlistDetailGuard, Router], (bucketGuard, router) => {
        const mockUrl = new MockUrlSegment();
        mockUrl.path = '3';
        mockSnapshot.url.push(mockUrl);
        spyOn(router, 'navigate');
        expect(bucketGuard.canActivate(mockSnapshot)).toBeTruthy();
      })
    ));
});

// mock the AlertService class with unimplemented methods
class MockAlertService {
  success(message: string) { }
  error(message: string) { }
  getMessage(): Observable<any> {
    return new Observable<void>();
  }
}

// mock the ActivatedRouteSnapshot
class MockActivatedRouteSnapshot {
  mockPath: MockUrlSegment = new MockUrlSegment;
  url: MockUrlSegment[] = new Array(this.mockPath);
}

// mock the UrlSegment class which has a property path
class MockUrlSegment {
  path: string;
}

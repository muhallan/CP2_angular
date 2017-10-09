import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { BucketlistDetailComponent } from './bucketlist-detail.component';
import { Router, ActivatedRoute, RouterOutlet, RouterStub, ActivatedRouteStub } from '../_helpers/router-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, BucketlistService } from '../_services/index';
import { ParamMap, ActivatedRouteSnapshot, UrlSegment, Params, Data, Route } from '@angular/router';

import { Observable } from 'RxJs';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Bucketlist, BucketlistItem } from '../_models/index';
import { EditBucketlistItemService } from '../modal-edit-bucketlist-item/modal-edit-bucketlist-item.component';
import { DeleteBucketlistItemService } from '../modal-delete-bucketlist-item/modal-delete-bucketlist-item.component';

import { BucketlistJson, testBucketlist } from '../_models/index';

describe('BucketlistDetailComponent', () => {
  let component: BucketlistDetailComponent;
  let fixture: ComponentFixture<BucketlistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
      declarations: [ BucketlistDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: RouterStub },
        { provide: AlertService, useClass: MockAlertService },
        { provide: DeleteBucketlistItemService, useClass: MockDeleteBucketlistItemService },
        { provide: EditBucketlistItemService, useClass: MockEditBucketlistItemService },
        { provide: BucketlistService, useClass: MockBucketlistService }
    ],
    schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketlistDetailComponent);
    component = fixture.componentInstance;
    // spy on the getBucketlist method
    spyOn(component, 'getBucketlist');
    fixture.detectChanges();
  });

  // test if the component is created successfully
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

// mock the AlertService
class MockAlertService {
  success(message: string) {}
  error(message: string) {}
  getMessage(): Observable<any> {
      return new Observable<void>();
  }
}

// mock the BucketlistService
class MockBucketlistService {
   getBucketlists(query: string, page: number, limit: number): Observable<BucketlistJson> {
     return Observable.of(testBucketlist);
   }
}

// mock the DeleteBucketlistItemService
class MockDeleteBucketlistItemService {

}

// mock the EditBucketlistItemService
class MockEditBucketlistItemService {

}

// mock the ActivatedRoute
export class MockActivatedRoute implements ActivatedRoute {
  snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data>;
  outlet: string;
  component: Type<any> | string | null;
  routeConfig: Route | null;
  root: ActivatedRoute;
  parent: ActivatedRoute | null;
  firstChild: ActivatedRoute | null;
  children: ActivatedRoute[];
  pathFromRoot: ActivatedRoute[];
  paramMap: Observable<ParamMap>;
  queryParamMap: Observable<ParamMap>;
  toString(): string {
    return '';
  }

}


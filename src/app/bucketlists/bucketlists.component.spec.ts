import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet, RouterStub, ActivatedRouteStub } from '../_helpers/router-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, BucketlistService } from '../_services/index';

import { Observable } from 'RxJs';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { DeleteBucketlistService } from '../modal-delete-bucketlist/modal-delete-bucketlist.component';
import { EditBucketlistService } from '../modal-edit-bucketlist/modal-edit-bucketlist.component';

import { BucketlistsComponent } from './bucketlists.component';
import { BucketlistJson, testBucketlist } from '../_models/index';

describe('BucketlistsComponent', () => {
  let component: BucketlistsComponent;
  let fixture: ComponentFixture<BucketlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
      declarations: [ BucketlistsComponent ],
      providers: [
          { provide: Router, useClass: RouterStub },
          { provide: AlertService, useClass: MockAlertService },
          { provide: DeleteBucketlistService, useClass: MockDeleteBucketlistService },
          { provide: EditBucketlistService, useClass: MockEditBucketlistService },
          { provide: BucketlistService, useClass: MockBucketlistService }
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class MockAlertService {
  success(message: string) {}
  error(message: string) {}
  getMessage(): Observable<any> {
      return new Observable<void>();
  }
}

class MockBucketlistService {
   getBucketlists(query: string, page: number, limit: number): Observable<BucketlistJson> {
     return Observable.of(testBucketlist);
   }
}

class MockDeleteBucketlistService {

}

class MockEditBucketlistService {

}




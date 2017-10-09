import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { Router, RouterStub } from '../_helpers/router-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, BucketlistService } from '../_services/index';

import { Observable } from 'RxJs';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Bucketlist, BucketlistItem } from '../_models/index';
import { EditBucketlistItemService } from '../modal-edit-bucketlist-item/modal-edit-bucketlist-item.component';
import { DeleteBucketlistItemService } from '../modal-delete-bucketlist-item/modal-delete-bucketlist-item.component';

import { BucketlistJson, testBucketlist } from '../_models/index';
import { AddBucketlistComponent } from './add-bucketlist.component';

describe('AddBucketlistComponent', () => {
  let component: AddBucketlistComponent;
  let fixture: ComponentFixture<AddBucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AddBucketlistComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AlertService, useClass: MockAlertService },
        { provide: BucketlistService, useClass: MockBucketlistService }
    ],
    schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBucketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

// mock the AlertService with empty methods
class MockAlertService {
  success(message: string) {}
  error(message: string) {}
  getMessage(): Observable<any> {
      return new Observable<void>();
  }
}

// mock the BucketlistService
class MockBucketlistService {
}

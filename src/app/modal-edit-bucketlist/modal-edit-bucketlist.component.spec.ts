import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditBucketlistComponent } from './modal-edit-bucketlist.component';
import { AlertService, BucketlistService } from '../_services/index';
import { testUser } from '../_models/index';


import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet, RouterStub, ActivatedRouteStub } from '../_helpers/router-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'RxJs';
import { HttpModule } from '@angular/http';

describe('ModalEditBucketlistComponent', () => {
  let component: ModalEditBucketlistComponent;
  let fixture: ComponentFixture<ModalEditBucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          FormsModule, HttpModule
      ],
      declarations: [ ModalEditBucketlistComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AlertService, useClass: MockAlertService },
        { provide: NgbModal, useClass: MockNgbModal },
        { provide: BucketlistService, useClass: MockBucketlistService },
        { provide: NgbActiveModal, useClass: MockNgbActiveModal },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef }
    ],
    schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditBucketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class MockAlertService {

}

class MockNgbModal {

}

class MockBucketlistService {

}

class MockNgbActiveModal {

}

class MockChangeDetectorRef {

}

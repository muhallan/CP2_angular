import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditBucketlistItemComponent } from './modal-edit-bucketlist-item.component';
import { DebugElement, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AlertService, AuthenticationService, BucketlistService } from '../_services/index';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, RouterOutlet, RouterStub, ActivatedRouteStub } from '../_helpers/router-stub';
import { FormsModule } from '@angular/forms';

describe('ModalEditBucketlistItemComponent', () => {
  let component: ModalEditBucketlistItemComponent;
  let fixture: ComponentFixture<ModalEditBucketlistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ModalEditBucketlistItemComponent ],
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
    fixture = TestBed.createComponent(ModalEditBucketlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

// create the mocks for the dependencies
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

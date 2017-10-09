import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalDeleteBucketlistComponent } from './modal-delete-bucketlist.component';

describe('ModalBasicComponent', () => {
  let component: ModalDeleteBucketlistComponent;
  let fixture: ComponentFixture<ModalDeleteBucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteBucketlistComponent ],
      providers: [
          { provide: NgbActiveModal, useClass: MockNgbActiveModal },
          { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef }
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteBucketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class MockNgbActiveModal {

}

class MockChangeDetectorRef {

}

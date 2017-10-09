import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalDeleteBucketlistItemComponent } from './modal-delete-bucketlist-item.component';

describe('ModalDeleteBucketlistItemComponent', () => {
  let component: ModalDeleteBucketlistItemComponent;
  let fixture: ComponentFixture<ModalDeleteBucketlistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteBucketlistItemComponent ],

      providers: [
          { provide: NgbActiveModal, useClass: MockNgbActiveModal },
          { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef }
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteBucketlistItemComponent);
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

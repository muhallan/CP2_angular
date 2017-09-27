import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteBucketlistComponent } from './modal-delete-bucketlist.component';

describe('ModalBasicComponent', () => {
  let component: ModalDeleteBucketlistComponent;
  let fixture: ComponentFixture<ModalDeleteBucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteBucketlistComponent ]
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteBucketlistItemComponent } from './modal-delete-bucketlist-item.component';

describe('ModalDeleteBucketlistItemComponent', () => {
  let component: ModalDeleteBucketlistItemComponent;
  let fixture: ComponentFixture<ModalDeleteBucketlistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteBucketlistItemComponent ]
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

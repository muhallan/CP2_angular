import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditBucketlistItemComponent } from './modal-edit-bucketlist-item.component';

describe('ModalEditBucketlistItemComponent', () => {
  let component: ModalEditBucketlistItemComponent;
  let fixture: ComponentFixture<ModalEditBucketlistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditBucketlistItemComponent ]
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

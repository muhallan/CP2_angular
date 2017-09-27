import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditBucketlistComponent } from './modal-edit-bucketlist.component';

describe('ModalEditBucketlistComponent', () => {
  let component: ModalEditBucketlistComponent;
  let fixture: ComponentFixture<ModalEditBucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditBucketlistComponent ]
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

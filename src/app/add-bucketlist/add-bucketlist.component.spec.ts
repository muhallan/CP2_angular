import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBucketlistComponent } from './add-bucketlist.component';

describe('AddBucketlistComponent', () => {
  let component: AddBucketlistComponent;
  let fixture: ComponentFixture<AddBucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBucketlistComponent ]
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

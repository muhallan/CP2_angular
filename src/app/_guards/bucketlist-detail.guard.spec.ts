import { TestBed, async, inject } from '@angular/core/testing';

import { BucketlistDetailGuard } from './bucketlist-detail.guard';

describe('BucketlistDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketlistDetailGuard]
    });
  });

  it('should ...', inject([BucketlistDetailGuard], (guard: BucketlistDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});

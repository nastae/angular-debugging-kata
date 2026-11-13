import { TestBed } from '@angular/core/testing';

import { IssueDialogService } from './issue-dialog.service';

describe('IssueDialogService', () => {
  let service: IssueDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

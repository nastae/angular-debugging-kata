import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IssuesService } from './issues.service';
import { Issue } from '../../../core/api/models/issue.model';
import { Observable, switchMap, filter } from 'rxjs';
import { Project } from '../../../core/api/models/project.model';
import { User } from '../../../core/api/models/user.model';
import { IssueDialogComponent } from '../dialogs/issue-dialog/issue-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class IssueDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly issuesService = inject(IssuesService);

  openEditIssueDialog(
    issueId: string,
    projects: Project[],
    users: User[]
  ): Observable<Issue> {
    return this.issuesService.getIssueById(issueId).pipe(
      switchMap(issue => {
        const dialogRef = this.dialog.open(IssueDialogComponent, {
          width: '560px',
          maxWidth: 'calc(100vw - 32px)',
          data: {
            mode: 'edit',
            issue,
            projects,
            users,
            reporterId: issue.reporterId
          }
        });

        return dialogRef.afterClosed();
      }),
      filter((updatedIssue): updatedIssue is Issue => Boolean(updatedIssue)),
      switchMap(updatedIssue => this.issuesService.updateIssue(updatedIssue))
    )
  }
}

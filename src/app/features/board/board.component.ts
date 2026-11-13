import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProjectService } from '../projects/services/project.service';
import { IssuesService } from '../issues/services/issues.service';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IssueStatus } from '../../core/api/models/issue-status.type';
import { MatIconModule } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { UsersService } from '../users/users.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { MatDialog } from '@angular/material/dialog';
import { IssueDialogComponent } from '../issues/dialogs/issue-dialog/issue-dialog.component';
import { startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    DragDropModule,
    MatIconModule,
    MatAnchor,
    AvatarComponent
],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {

  private readonly projectService = inject(ProjectService);
  private readonly issuesService = inject(IssuesService);
  private readonly usersService = inject(UsersService);

  private readonly dialog = inject(MatDialog);

  private readonly refreshIssues$ = new Subject<void>();

  readonly projects = toSignal(
    this.projectService.getProjects(),
    {
      initialValue: []
    }
  );

  private readonly users = toSignal(
    this.usersService.getUsers(),
    {
      initialValue: []
    }
  );

  readonly selectedProject = signal<number | null>(1);

  readonly issues = toSignal(
    this.refreshIssues$.pipe(
      startWith(undefined),
      switchMap(() => this.issuesService.getIssues())
    ),
    {
      initialValue: []
    }
  );

  readonly doneVisibleCount = signal(1);

  readonly donePageSize = 2;

  readonly projectIssues = computed(() => {
    const projectId = this.selectedProject();

    if (projectId === null) {
      return [];
    }

    return this.issues().filter(
      issue => issue.projectId === projectId
    );
  });

  readonly issuesByStatus = computed(() => {
    const issues = this.projectIssues();

    return {
      'Todo': issues.filter(issue => issue.status === 'Todo'),
      'In Progress': issues.filter(
        issue => issue.status === 'In Progress'
      ),
      'In Review': issues.filter(
        issue => issue.status === 'In Review'
      ),
      'Done': issues.filter(
        issue => issue.status === 'Done'
      )
    };
  });

  readonly visibleIssuesByStatus = computed(() => {
    const result = { ...this.issuesByStatus() };

    result['Done'] = result['Done'].slice(
      0,
      this.doneVisibleCount()
    );

    return result;
  });

  readonly usersById = computed(() => 
    new Map(this.users().map(user => [user.id, user]))
  );

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>, status: IssueStatus): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      return;
    }

    const issue = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.changeIssueStatus(issue.id, status);
  }

  createIssue(): void {
    const dialogRef = this.dialog.open(
      IssueDialogComponent,
      {
        width: '560px',
        maxWidth: 'calc(100vw - 32px)',
        data: {
          mode: 'create',
          projects: this.projects(),
          users: this.users(),
          reporterId: 'user-001'
        }
      }
    );

    dialogRef.afterClosed().subscribe(issue => {
      if (!issue) {
        return;
      }

      this.issuesService.createIssue(issue).subscribe(() => {
        this.refreshIssues$.next();
      });
    });
  }

  private changeIssueStatus(issueId: string, status: IssueStatus): void {

    this.issuesService.updateIssueStatus(issueId, status)
      .subscribe({
        next: () => {
          this.refreshIssues$.next();
        }
      });
  }

  showMoreDoneIssues(): void {
    this.doneVisibleCount.update(
      count => count + this.donePageSize
    );
  }

  getRemainingDoneIssuesText(): string {
    const remaining = 
      this.issuesByStatus()['Done'].length -
      this.doneVisibleCount();

      const count = Math.min(
        this.donePageSize,
        remaining
      );

      return `${count} more issues${count === 1 ? '' : 's'}`;
  }
}

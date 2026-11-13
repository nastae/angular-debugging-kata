import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, map, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { IssuesService } from './services/issues.service';
import { ProjectService } from '../projects/services/project.service';
import { UsersService } from '../users/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from "@angular/material/table";
import { DatePipe } from '@angular/common';
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select'
import { ISSUE_STATUSES } from '../../core/api/models/issue-status.type';
import { ISSUE_TYPES } from '../../core/api/models/issue-type.type';
import { PRIORITIES } from '../../core/api/models/priority.type';
import { TableFooterComponent } from '../../shared/components/table-footer/table-footer.component';
import { MatDialog } from '@angular/material/dialog';
import { IssueDialogComponent } from './dialogs/issue-dialog/issue-dialog.component';
import { DeleteConfirmationDialogComponent } from '../projects/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueDialogService } from './services/issue-dialog.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationControlsComponent } from '../../shared/components/pagination-controls/pagination-controls/pagination-controls.component';

@Component({
  selector: 'app-issues',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    DatePipe,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    TableFooterComponent,
    AvatarComponent,
    MatTooltipModule,
    PaginationControlsComponent
],
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.scss',
})
export class IssuesComponent {

  private readonly issuesService = inject(IssuesService);
  private readonly projectService = inject(ProjectService);
  private readonly usersService = inject(UsersService);
  private readonly issueDialogService = inject(IssueDialogService);
  private readonly router = inject(Router);

  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);

  private readonly refreshIssues$ = new Subject<void>();

  readonly statusFilterOptions = ISSUE_STATUSES;
  readonly typeFilterOptions = ISSUE_TYPES;
  readonly priorityFilterOptions = PRIORITIES;

  selectedProject = signal('');
  selectedStatus = signal('');
  selectedType = signal('');
  selectedPriority = signal('');
  selectedAssignee = signal('');

  readonly rows$ = this.refreshIssues$.pipe(
    startWith(undefined),

    switchMap(() => 
      combineLatest([
        this.issuesService.getIssues(),
        this.projectService.getProjects(),
        this.usersService.getUsers()
      ])
    ),

    map(([issues, projects, users]) => 
      issues.map(issue => ({
        id: issue.id,
        key: issue.key,
        summary: issue.summary,

        projectId: issue.projectId,
        projectKey: projects.find(
          project => project.id === issue.projectId
        )?.key ?? '',

        status: issue.status,
        type: issue.type,
        priority: issue.priority,

        assigneeId: issue.assigneeId,
        assignee: users.find(
          user => user.id === issue.assigneeId
        ) ?? null,

        updatedAt: issue.updatedAt
      }))
    ),

    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  readonly rows = toSignal(this.rows$, {
    initialValue: []
  });

  readonly filteredRows = computed(() => {
    return this.rows().filter(issue => {
      if (this.selectedProject() && 
        issue.projectId !== Number(this.selectedProject())) {
          return false;
      }

      if (this.selectedStatus() &&
        issue.status !== this.selectedStatus()) {
          return false;
      }

      if (this.selectedType() &&
        issue.type !== this.selectedType()) {
          return false;
      }

      if (this.selectedPriority() &&
        issue.priority !== this.selectedPriority()) {
          return false;
      }

      if (this.selectedAssignee() &&
        issue.assigneeId !== this.selectedAssignee()) {
          return false;
      }

      return true;
    });
  });

  constructor() {
    const projectId = this.route.snapshot.queryParamMap.get('project');

    if (projectId) {
      this.selectedProject.set(projectId);
    }
  }

  readonly pageSize = 10;
  readonly currentPage = signal(0);

  readonly totalIssues = computed(() => this.filteredRows().length);

  readonly totalPages = computed(() => 
    Math.ceil(this.totalIssues() / this.pageSize)
  );

  readonly effectivePage = computed(() =>
    Math.min(
      this.currentPage(),
      Math.max(this.totalPages() - 1, 0)
    )
  );

  readonly paginatedRows = computed(() => {
    const start = this.effectivePage() * this.pageSize;

    return this.filteredRows().slice(
      start,
      start + this.pageSize
    );
  });

  readonly startIssueIndex = computed(() => {
    if (this.totalIssues() == 0)
      return 0;

    return this.effectivePage() * this.pageSize + 1;
  });

  readonly endIssueIndex = computed(() => {
    return Math.min(
      (this.effectivePage() + 1) * this.pageSize,
      this.totalIssues()
    );
  });

  readonly projects = toSignal(
    this.projectService.getProjects(),
    {
      initialValue: []
    }
  )

  readonly users = toSignal(
    this.usersService.getUsers(),
    {
      initialValue: []
    }
  );

  displayedColumns = [
    'key',
    'summary',
    'status',
    'type',
    'priority',
    'assignee',
    'updatedAt',
    'actions'
  ];

  openCreateIssueDialog(): void {
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

  openIssue(issueId: string): void {
    this.router.navigate([
      '/issues',
      issueId
    ])
  }

  openEditIssueDialog(row: { id: string }): void {
    this.issueDialogService
    .openEditIssueDialog(row.id, this.projects(), this.users())
    .subscribe(() => {
      this.refreshIssues$.next();
    });
  }

  openDeleteIssueDialog(row: { id: string; key: string }): void {
    const dialogRef = this.dialog.open(
      DeleteConfirmationDialogComponent,
      {
        width: '540px',
        maxWidth: 'calc(100wv - 32px)',
        data: {
          entityName: 'Issue'
        }
      }
    );

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.issuesService
        .deleteIssue(row.id)
        .subscribe(() => {
          this.refreshIssues$.next();
        })
    });
  }

  clearFilters() {
    this.selectedProject.set('')
    this.selectedStatus.set('');
    this.selectedType.set('');
    this.selectedPriority.set('');
    this.selectedAssignee.set('');

    this.resetPagination();
  }

  resetPagination(): void {
    this.currentPage.set(0);
  }
}

import { Component, inject, computed, signal } from '@angular/core';
import { Subject, combineLatest, map, refCount, shareReplay, startWith, switchMap } from 'rxjs';
import { MatTableModule } from '@angular/material/table'
import { MatMenuModule } from '@angular/material/menu'
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ProjectService } from './services/project.service';
import { UsersService } from '../users/users.service';
import { IssuesService } from '../issues/services/issues.service';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { ProjectTableRow } from './models/project-table-row.interface';
import { TableFooterComponent } from '../../shared/components/table-footer/table-footer.component';
import { ProjectDialogComponent } from './dialogs/project-dialog/project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { PaginationControlsComponent } from '../../shared/components/pagination-controls/pagination-controls/pagination-controls.component';

@Component({
  selector: 'app-projects',
  imports: [
    MatTableModule,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TableFooterComponent,
    AvatarComponent,
    PaginationControlsComponent
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {

  private readonly projectService = inject(ProjectService);
  private readonly usersService = inject(UsersService);
  private readonly issuesService = inject(IssuesService);

  private readonly router = inject(Router);

  private readonly refreshProjects$ = new Subject<void>();

  readonly rows$ = this.refreshProjects$.pipe(
    startWith(undefined),

    switchMap(() =>
      combineLatest([
        this.projectService.getProjects(),
        this.users$,
        this.issuesService.getIssues()
      ])
    ),

    map(([projects, users, issues]) => 
      projects.map(project => ({
        id: project.id,
        key: project.key,
        name: project.name,
        lead: users.find(
          user => user.id === project.leadId
        )!,
        issueCount: issues.filter(
          issue => issue.projectId === project.id
        ).length,
        createdAt: project.createdAt
      }))
    ),

    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly users$ = this.usersService.getUsers().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  
  readonly users = toSignal(
    this.users$,
    {
      initialValue: []
    }
  );

  readonly rows = toSignal(this.rows$, {
    initialValue: []
  })

  readonly pageSize = 5;
  readonly currentPage = signal(0);

  readonly totalProjects = computed(() => this.rows().length);

  readonly totalPages = computed(() => 
    Math.ceil(this.totalProjects() / this.pageSize)
  );

  readonly effectivePage = computed(() =>
    Math.min(
      this.currentPage(),
      Math.max(this.totalPages() - 1, 0)
    )
  );

  readonly paginatedRows = computed(() => {
    const start = this.effectivePage() * this.pageSize;

    return this.rows().slice(
      start,
      start + this.pageSize
    );
  });

  readonly startProjectIndex = computed(() => {
    if (this.totalProjects() == 0) {
      return 0;
    }

    return this.effectivePage() * this.pageSize + 1;
  });

  readonly endProjectIndex = computed(() => {
    return Math.min(
      (this.effectivePage() + 1) * this.pageSize,
      this.totalProjects()
    );
  });

  displayedColumns = [
    'key',
    'name',
    'lead',
    'issues',
    'createdAt',
    'actions'
  ]

  private readonly dialog = inject(MatDialog);

  openProject(row: ProjectTableRow): void {
    this.router.navigate([
      '/projects',
      row.id
    ]);
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(
      ProjectDialogComponent,
      {
        width: '500px',
        maxWidth: 'calc(100vw - 32px)',
        data: {
          mode: 'create',
          users: this.users()
        }
      }
    );

    dialogRef.afterClosed().subscribe(project => {
      if (!project) {
        return;
      }

      this.projectService.createProject(project).subscribe(() => {
        this.refreshProjects$.next();
      });
    });
  }

  openProjectDetails(id: number): void {
    this.router.navigate(['/projects', id]);
  }

  openEditProjectDialog(row: ProjectTableRow): void {
    this.projectService.getProject(row.id).subscribe(project => {

      const dialogRef = this.dialog.open(
        ProjectDialogComponent,
        {
          width: '500px',
          maxWidth: 'calc(100vw - 32px)',
          data: {
            mode: 'edit',
            project,
            users: this.users()
          }
        }
      );

      dialogRef.afterClosed().subscribe(updatedProject => {
        if (!updatedProject) {
          return;
        }

        this.projectService
          .updateProject(updatedProject)
          .subscribe(() => {
            this.refreshProjects$.next();
          });
      });
    });
  }

  openDeleteProjectDialog(row: ProjectTableRow): void {
    const dialogRef = this.dialog.open(
      DeleteConfirmationDialogComponent,
      {
        width: '540px',
        maxWidth: 'calc(100vw - 32px)',
        data: {
          entityName: 'Project'
        }
      }
    );

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.projectService
        .deleteProject(row.id)
        .subscribe(() => {
          this.refreshProjects$.next();
        });
    });
  }
}


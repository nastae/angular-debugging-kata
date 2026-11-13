import { Component, computed, inject, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, startWith, Subject, switchMap, filter, shareReplay } from 'rxjs';
import { UsersService } from './users.service';
import { IssuesService } from '../issues/services/issues.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TableFooterComponent } from '../../shared/components/table-footer/table-footer.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { PaginationControlsComponent } from '../../shared/components/pagination-controls/pagination-controls/pagination-controls.component';

@Component({
  selector: 'app-users',
  imports: [
    MatAnchor, 
    MatIconModule, 
    MatCardModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    AvatarComponent,
    TableFooterComponent,
    PaginationControlsComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private readonly usersService = inject(UsersService);
  private readonly issuesService = inject(IssuesService);

  private readonly refreshUsers$ = new Subject<void>();

  readonly searchTerm = signal('');
  readonly selectedFilter = signal('all');

  private readonly dialog = inject(MatDialog);

  readonly rows$ = this.refreshUsers$.pipe(
    startWith(undefined),
    
    switchMap(() => 
      combineLatest([
        this.usersService.getUsers(),
        this.issuesService.getIssues()
      ])
    ),

    map(([users, issues]) => 
      users.map(user => ({
        ...user,

        assignedIssueCount: issues.filter(
          issue => issue.reporterId === user.id
        ).length,

        createdAt: undefined
      }))
    ),

    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  readonly rows = toSignal(this.rows$, {
    initialValue: []
  })

  readonly filteredRows = computed(() => {
    const search = this.searchTerm()
      .trim()
      .toLowerCase();

      return this.rows().filter(user => {
        
        if (search) {
          const matchesSearch = 
            user.fullName.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search);

            if (!matchesSearch) {
              return false;
            }
        }

        if (this.selectedFilter() === 'assigned') {
          return user.assignedIssueCount > 0;
        }

        if (this.selectedFilter() === 'unassigned') {
          return user.assignedIssueCount === 0;
        }

        return true;
      });
  });

  readonly pageSize = 5;
  readonly currentPage = signal(0);

  readonly totalFilteredUsers = computed(() => 
    this.filteredRows().length
  );

  readonly totalPages = computed(() => 
    Math.ceil(this.totalFilteredUsers() / this.pageSize)
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

  readonly startUserIndex = computed(() => {
    if (this.totalFilteredUsers() === 0) {
      return 0;
    }

    return this.effectivePage() * this.pageSize + 1;
  });

  readonly endUserIndex = computed(() => 
    Math.min(
      (this.effectivePage() + 1) * this.pageSize,
      this.totalFilteredUsers()
    )
  );

  readonly totalUsers = computed(() => 
    this.rows().length
  );

  readonly usersWithAssignedIssues = computed(() => 
    this.rows().filter(
      user => user.assignedIssueCount > 0
    ).length
  );

  readonly mostAssignedUser = computed(() => {
    const users = this.rows();

    if (!users || users.length === 0) {
      return null;
    }

    return users.reduce((mostAssigned, user) => 
      user.assignedIssueCount > mostAssigned.assignedIssueCount
        ? user 
        : mostAssigned
    )
  });

  readonly activeUsers = computed(() => 
    this.rows().filter(
      user => user.assignedIssueCount > 0
    ).length
  );

  displayedColumns = [
    'avatar',
    'name',
    'email',
    'assignedIssues'
  ];

  setSearch(value: string): void {
    this.searchTerm.set(value);
    this.resetPagination();
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(
      UserDialogComponent,
      {
        width: '480px',
        maxWidth: 'calc(100vw - 32px)',
        data: []
      }
    );

    dialogRef.afterClosed().subscribe(user => {
      if (!user) {
        return;
      }

      this.usersService.createUser(user).subscribe({
        next: () => {
          this.refreshUsers$.next()
        },
        error: error => {
          console.error('Failed to create user: ', error);
        }
      });
    });
  }

  resetPagination(): void {
    this.currentPage.set(0);
  }
}

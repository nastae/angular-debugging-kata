import { Comment } from './../../../core/api/models/comment.model';
import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../../../core/api/models/issue.model';
import { combineLatest, switchMap } from 'rxjs';
import { IssuesService } from '../services/issues.service';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { User } from '../../../core/api/models/user.model';
import { UsersService } from '../../users/users.service';
import { DatePipe, LowerCasePipe, NgClass } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectService } from '../../projects/services/project.service';
import { Project } from '../../../core/api/models/project.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IssueDialogService } from '../services/issue-dialog.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { CurrentUserService } from '../../../core/auth/current-user.service';

@Component({
  selector: 'app-issue-details',
  imports: [MatIcon, MatAnchor, MatMenuModule, NgClass, LowerCasePipe, MatTabsModule, DatePipe, MatFormField, MatInput, ReactiveFormsModule, AvatarComponent],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss',
})
export class IssueDetailsComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly issuesService = inject(IssuesService);
  private readonly usersService = inject(UsersService);
  private readonly projectService = inject(ProjectService);
  private readonly issueDialogService = inject(IssueDialogService);
  readonly currentUserService = inject(CurrentUserService);

  readonly commentControl = new FormControl(
    '',
    {
      nonNullable: true,
      validators: [Validators.required]
    }
  );

  readonly issue = signal<Issue | undefined>(undefined);
  readonly project = signal<Project | undefined>(undefined);
  readonly assignee = signal<User | undefined>(undefined);
  readonly reporter = signal<User | undefined>(undefined);

  readonly comments = signal<Comment[]>([]); 
  readonly commentAuthors = signal<Map<string, User>>(new Map());

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

  ngOnInit(): void {
    this.loadIssue();
  }

  private loadIssue(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const issueId = params.get('id')!;

        return combineLatest([
          this.issuesService.getIssueById(issueId),
          this.projectService.getProjects(),
          this.usersService.getUsers(),
          this.issuesService.getComments(issueId)
        ])
      })
    ).subscribe(([issue, projects, users, comments]) => {
      this.issue.set(issue);

      this.project.set(projects.find(
        project => project.id === issue.projectId
      ));

      this.reporter.set(users.find(
        user => user.id === issue.reporterId
      ));

      this.assignee.set(users.find(
        user => user.id === issue.assigneeId
      ));

      this.comments.set(comments);

      this.commentAuthors.set(
        new Map(users.map(user => [user.fullName, user]))
      );
    });
  }

  getUser(userId: string): User | undefined {
    return this.commentAuthors().get(userId);
  }

  addComment(): void {
    const body = this.commentControl.value.trim();

    if (!body || !this.issue()) {
      this.commentControl.markAsTouched();
      return;
    }

    const now = new Date().toISOString();

    const comment: Comment = {
      id: '',
      issueId: this.issue()?.id!,
      authorId: this.currentUserService.currentUserId() ?? '',
      text: body,
      createdAt: now
    };

    this.issuesService.addComment(comment)
      .subscribe(newComment => {
        this.comments.update(comments => [
          ...comments, newComment
        ]);

        this.commentControl.reset();
      });
  }

  goToIssues(): void {
    this.router.navigate(['/issues']);
  }

  openEditIssueDialog(): void {
    const currentIssue = this.issue();
    if (!currentIssue) {
      return;
    }

    this.issueDialogService
      .openEditIssueDialog(currentIssue.id, this.projects(), this.users())
      .subscribe(updatedIssue => {
        this.issue.set(updatedIssue);
      });
  }
}

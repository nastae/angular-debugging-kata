import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogClose, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Project } from '../../../../core/api/models/project.model';
import { User } from '../../../../core/api/models/user.model';
import { Issue } from '../../../../core/api/models/issue.model';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISSUE_TYPES, IssueType } from '../../../../core/api/models/issue-type.type';
import { PRIORITIES, Priority } from '../../../../core/api/models/priority.type';
import { ISSUE_STATUSES, IssueStatus } from '../../../../core/api/models/issue-status.type';
import { MatSelectModule } from "@angular/material/select";
import { MatInput } from "@angular/material/input";
import { CurrentUserService } from '../../../../core/auth/current-user.service';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';

export type IssueDialogMode = 'create' | 'edit';

export interface IssueDialogData {
  mode: IssueDialogMode;
  projects: Project[];
  users: User[];

  reporterId: string;

  issue?: Issue;
}

@Component({
  selector: 'app-issue-dialog',
  imports: [ReactiveFormsModule, MatDialogTitle, MatButtonModule, MatDialogClose, MatIconModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatInput, AvatarComponent],
  templateUrl: './issue-dialog.component.html',
  styleUrl: './issue-dialog.component.scss',
})
export class IssueDialogComponent {

  private readonly fb = inject(NonNullableFormBuilder);

  private readonly dialogRef = inject(MatDialogRef<IssueDialogComponent>);
  private readonly currentUserService = inject(CurrentUserService);

  readonly data = inject<IssueDialogData>(MAT_DIALOG_DATA);

  readonly isEditMode = this.data.mode === 'edit';

  readonly issueStatuses = ISSUE_STATUSES;
  readonly issueTypes = ISSUE_TYPES;
  readonly issuePriorities = PRIORITIES;

  readonly form = this.fb.group({
    projectId: [
      this.data.issue?.projectId ?? 0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    summary: [
      this.data.issue?.summary ?? '',
      [
        Validators.maxLength(200)
      ]
    ],

    description: [
      this.data.issue?.description ?? '',
      [
        Validators.maxLength(2000)
      ]
    ],

    type: [
      this.data.issue?.type ?? 'Task' as IssueType,
      [
        Validators.required
      ]
    ],

    priority: [
      this.data.issue?.priority ?? 'Medium' as Priority,
      [
        Validators.required
      ]
    ],

    assigneeId: [
      this.data.issue?.assigneeId ?? ''
    ],

    status: [
      this.data.issue?.status ?? 'Todo' as IssueStatus,
      [
        Validators.required
      ]
    ]
  });

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      this.updateIssue();
    } else {
      this.createIssue();
    }
  }

  private createIssue(): void {
    const value = this.form.getRawValue();

    const now = new Date().toISOString();

    const currentUserId = this.currentUserService.currentUserId();

    const issue: Issue = {
      id: crypto.randomUUID(),
      key: '',
      summary: value.summary,
      description: value.description,
      projectId: value.projectId,
      assigneeId: value.assigneeId || undefined,
      reporterId: this.data.reporterId,
      createdById: currentUserId ?? '',
      updatedById: currentUserId ?? '',
      priority: value.priority,
      status: value.status,
      type: value.type,
      createdAt: now,
      updatedAt: now
    }

    this.dialogRef.close(issue);
  }

  private updateIssue(): void {
    if (!this.data.issue) {
      return;
    }

    const value = this.form.getRawValue();

    const issue: Issue = {
      ...this.data.issue,
      projectId: value.projectId,
      summary: value.summary,
      description: value.description,
      type: value.type,
      priority: value.priority,
      assigneeId: value.assigneeId || undefined,
      updatedById: this.currentUserService.currentUserId() ?? this.data.issue?.updatedById,
      status: value.status,
      updatedAt: new Date().toISOString()
    };

    this.dialogRef.close(issue);
  }
}

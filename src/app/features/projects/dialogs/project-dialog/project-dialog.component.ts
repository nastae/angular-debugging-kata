import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from "@angular/material/input";
import { CdkTableModule } from "@angular/cdk/table";
import { MatSelectModule } from "@angular/material/select";
import { User } from '../../../../core/api/models/user.model';
import { Project } from '../../../../core/api/models/project.model';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';

export type ProjectDialogMode = 'create' | 'edit';

export interface ProjectDialogData {
  mode: ProjectDialogMode;
  users: User[];
  project?: Project;
}

@Component({
  selector: 'app-project-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInput,
    CdkTableModule,
    MatSelectModule,
    AvatarComponent
],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss',
})
export class ProjectDialogComponent {

  private readonly fb = inject(NonNullableFormBuilder);

  private readonly dialogRef = inject(MatDialogRef<ProjectDialogComponent>);

  readonly data = inject<ProjectDialogData>(MAT_DIALOG_DATA);

  readonly isEditMode = this.data.mode === 'edit';

  readonly form = this.fb.group({
    key: [
      this.data.project?.key ?? '',
      [
        Validators.required,
        Validators.pattern(/^[A-Z]{2,10}$/)
      ]
    ],
    name: [
      this.data.project?.name ?? '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],
    description: [
      this.data.project?.description ?? '',
      [
        Validators.maxLength(500)
      ]
    ],
    leadId: [
      this.data.project?.leadId ?? '',
      [
        Validators.required
      ]
    ]
  });

  constructor() {
    if (this.isEditMode) {
      this.form.controls.key.disable();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      this.updateProject();
    } else {
      this.createProject();
    }
  }

  private createProject(): void {
    const value = this.form.getRawValue();

    const now = new Date().toISOString();

    const project: Project = {
      id: Date.now(),
      key: value.key,
      name: value.name,
      description: value.description,
      leadId: value.leadId,
      createdAt: now,
      updatedAt: now
    };

    this.dialogRef.close(project);
  }

  private updateProject(): void {
    if (!this.data.project) {
      return;
    }

    const value = this.form.getRawValue();

    const project: Project = {
      ...this.data.project,
      key: this.data.project.key,
      name: value.name,
      description: value.description,
      leadId: value.leadId,
      updatedAt: new Date().toISOString()
    };

    this.dialogRef.close(project);
  }
}

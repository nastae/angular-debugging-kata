import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { User } from '../../../../core/api/models/user.model';

@Component({
  selector: 'app-user-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInput
],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
})
export class UserDialogComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  private readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);

  readonly form = this.fb.group({
    fullName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(254)
      ]
    ],
    avatarUrl: [
      '',
      [Validators.maxLength(2048)]
    ]
  });

  cancel(): void {
    this.dialogRef.close();
  }

  createUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const user: User = {
      id: '',
      fullName: value.fullName.trim(),
      email: value.email.trim(),
      avatarUrl: value.avatarUrl.trim()
    }

    this.dialogRef.close(user);
  }
}

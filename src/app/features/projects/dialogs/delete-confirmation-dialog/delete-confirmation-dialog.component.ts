import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

export interface DeleteConfirmationDialogData {
  entityName: string;
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [MatDialogTitle, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<DeleteConfirmationDialogComponent>);

  readonly data = inject<DeleteConfirmationDialogData>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}

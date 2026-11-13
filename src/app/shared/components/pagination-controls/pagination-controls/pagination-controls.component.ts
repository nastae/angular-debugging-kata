import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pagination-controls',
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.scss',
})
export class PaginationControlsComponent {

  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();

  readonly pageChange = output<number>();

  goToFirstPage(): void {
    this.pageChange.emit(0);
  }

  goToPreviousPage(): void {
    this.pageChange.emit(this.currentPage() - 1);
  }

  goToNextPage(): void {
    this.pageChange.emit(this.currentPage() + 1);
  }

  goToLastPage(): void {
    this.pageChange.emit(this.totalPages() - 1);
  }
}

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-footer',
  imports: [],
  templateUrl: './table-footer.component.html',
  styleUrl: './table-footer.component.scss',
})
export class TableFooterComponent {

  readonly start = input.required<number>();
  readonly end = input.required<number>();
  readonly total = input.required<number>();
  readonly itemName = input.required<string>();
}

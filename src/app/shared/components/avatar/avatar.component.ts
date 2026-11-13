import { Component, input } from '@angular/core';
import { InitialsPipe } from '../../pipes/initials-pipe';

@Component({
  selector: 'app-avatar',
  imports: [InitialsPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  url = input<string | null | undefined>();
  name = input.required<string>();
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
}

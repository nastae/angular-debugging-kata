import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { UsersService } from '../../features/users/users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly UsersService = inject(UsersService);

  private readonly selectedUserId = signal<string | null>(
    localStorage.getItem('currentUserId')
  );

  readonly users = toSignal(this.UsersService.getUsers(), {
    initialValue: []
  });

  readonly currentUser = computed(() => 
    this.users().find(
      user => user.id === this.selectedUserId()
    ) ?? null
  );

  readonly currentUserId = computed(
    () => this.currentUser()?.id ?? null
  );

  constructor() {
    effect(() => {
      const currentUsers = this.users();
      const currentSelection = this.selectedUserId();

      if ( currentUsers.length > 0) {
        const isValid = currentUsers.some(user =>
          user.id === currentSelection
        );

        if (!currentSelection || !isValid) {
          this.setCurrentUser(currentUsers[0].id)
        }
      }
    });
  }

  setCurrentUser(userId: string | null): void {
    this.selectedUserId.set(userId);

    if (userId) {
      localStorage.setItem('currentUserId', userId);
    } else {
      localStorage.removeItem('currentUserId');
    }
  }
}

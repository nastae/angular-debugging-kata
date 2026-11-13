import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Projects',
      icon: 'folder',
      route: '/projects'
    },
    {
      label: 'Issues',
      icon: 'bug_report',
      route: '/issues'
    },
    {
      label: 'Board',
      icon: 'view_kanban',
      route: '/board'
    },
    {
      label: 'Users',
      icon: 'people',
      route: '/users'
    }
  ];
}

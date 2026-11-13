import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
            .then(c => c.DashboardComponent),
    },
    {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.routes')
            .then(c => c.PROJECT_ROUTES),
    },
    {
        path: 'issues',
        loadChildren: () => import('./features/issues/issues.routes')
            .then(c => c.ISSUES_ROUTES),
    },
    {
        path: 'board',
        loadComponent: () => import('./features/board/board.component')
            .then(c => c.BoardComponent),
    },
    {
        path: 'users',
        loadComponent: () => import('./features/users/users.component')
            .then(c => c.UsersComponent)
    },
    {
        path: '*',
        redirectTo: 'dashboard'
    }
];

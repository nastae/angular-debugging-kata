import { Routes } from "@angular/router";

export const ISSUES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./issues.component')
            .then(c => c.IssuesComponent),
    },
    {
        path: ':id',
        loadComponent: () => import('./issue-details/issue-details.component')
            .then(c => c.IssueDetailsComponent),
    }
]
import { Routes } from "@angular/router";

export const PROJECT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./projects.component')
            .then(c => c.ProjectsComponent),
    },
    {
        path: ':id',
        loadComponent: () => import('./project-details/project-details.component')
            .then(c => c.ProjectDetailsComponent),
    },
];
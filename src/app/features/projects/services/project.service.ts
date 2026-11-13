import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../../../core/api/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private readonly http = inject(HttpClient);

  getProjects() {
    return this.http.get<Project[]>('/api/projects');
  }

  createProject(project: Project) {
    return this.http.post<Project>(
      '/api/projects',
      project
    );
  }

  updateProject(project: Project) {
    return this.http.put<Project>(
      `/api/projects/${project.id}`,
      project
    );
  }

  getProject(id: number) {
    return this.http.get<Project>(
      `/api/projects/${id}`
    );
  }

  deleteProject(id: number) {
    return this.http.delete<void>(
      `/api/projects/${id}`
    );
  }
}

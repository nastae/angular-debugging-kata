import { Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, shareReplay, switchMap } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { UsersService } from '../../users/users.service';
import { IssuesService } from '../../issues/services/issues.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-project-details',
  imports: [MatIcon, DatePipe, AvatarComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly projectService = inject(ProjectService);
  private readonly usersService = inject(UsersService);
  private readonly issuesService = inject(IssuesService);

  readonly projectData$ = this.route.paramMap.pipe(
    switchMap(params => {
      const projectId = Number(params.get('id'));

      return combineLatest([
        this.projectService.getProject(projectId),
        this.usersService.getUsers(),
        this.issuesService.getIssues()
      ]);
    }),

    map(([project, users, issues]) => {
      const lead = users.find(
        user => user.id === project.leadId
      );

      const projectIssues = issues
        .filter(issue => issue.projectId === project.id);
    
      const recentIssues = [...projectIssues]
        .sort(
          (a, b) => 
            new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
        )
        .slice(0, 3)
        .map(issue => ({
          ...issue,
          assignee: users.find(
            user => user.id === issue.assigneeId
          )
        }));

        return {
          project,
          lead,
          issueCount: projectIssues.length,

          statistics: {
            todo: projectIssues.filter(
              issue => issue.status === 'Todo'
            ),

            inProgress: projectIssues.filter(
              issue => issue.status === 'In Progress'
            ),

            inReview: projectIssues.filter(
              issue => issue.status === 'In Review'
            ),

            done: projectIssues.filter(
              issue => issue.status === 'Done'
            )
          },

          recentIssues
        };
    }),

    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  readonly projectData = toSignal(
    this.projectData$,
    {
      initialValue: null
    }
  );

  readonly project = computed(() => 
    this.projectData()?.project
  );

  goBackToProjects(): void {
    this.router.navigate(['/projects']);
  }

  viewAllIssues(): void {
    const project = this.project();

    if (!project) {
      return;
    }

    this.router.navigate(
      ['/issues'],
      {
        queryParams: {
          project: project.id
        }
      }
    );
  }

  openIssue(issueId: string): void {
    this.router.navigate([
      '/issues',
      issueId
    ])
  }
}

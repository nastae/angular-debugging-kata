import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { IssueStatus } from '../../core/api/models/issue-status.type';
import { ProjectService } from '../../core/api/services/project.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IssuesService } from '../issues/services/issues.service';
import { Project } from '../../core/api/models/project.model';
import { CommentService } from '../issues/services/comment.service';
import { Activity, ActivityAction } from '../../core/api/models/activity.model';
import { UsersService } from '../users/users.service';
import { RelativeTimePipe } from './pipes/relative-time-pipe';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatIconModule, RelativeTimePipe, AvatarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  private readonly projectService = inject(ProjectService);
  private readonly issuesService = inject(IssuesService);
  private readonly usersService = inject(UsersService);
  private readonly commentService = inject(CommentService);

  readonly projects = toSignal(
    this.projectService.getProjects(),
    {
      initialValue: [] as Project[]
    }
  );

  readonly projectCount = computed(() => 
    this.projects().length
  );

  readonly issues = toSignal(
    this.issuesService.getIssues(),
    {
      initialValue: []
    }
  );

  readonly users = toSignal(
    this.usersService.getUsers(),
    {
      initialValue: []
    }
  );

  readonly comments = toSignal(
    this.commentService.getComments(),
    {
      initialValue: []
    }
  );

  readonly issueCount = computed(() => 
    this.issues().length
  );

  readonly todoIssueCount = computed(() => 
    this.issues().filter(issue => issue.status === 'Todo').length
  );

  readonly inProgressIssueCount = computed(() => 
    this.issues().filter(issue => issue.status === 'In Progress').length
  );

  readonly inReviewIssueCount = computed(() => 
    this.issues().filter(issue => issue.status === 'In Review').length
  );

  readonly doneIssueCount = computed(() => 
    this.issues().filter(issue => issue.status === 'Done').length
  );

  readonly statistics = [
    {
      label: 'Projects',
      value: this.projectCount,
      linkText: 'View all projects',
      link: '/projects'
    },
    {
      label: 'Issues',
      value: this.issueCount,
      linkText: 'View all issues',
      link: '/issues'
    },
    {
      label: 'To Do',
      value: this.todoIssueCount,
      icon: 'article',
      iconClass: 'todo'
    },
    {
      label: 'In Progress',
      value: this.inProgressIssueCount,
      icon: 'change_circle',
      iconClass: 'in-progress'
    },
    {
      label: 'In Review',
      value: this.inReviewIssueCount,
      icon: 'chat-bubble',
      iconClass: 'in-review'
    },
    {
      label: 'Done',
      value: this.doneIssueCount,
      icon: 'check_circle',
      iconClass: 'done'
    }
  ];

  readonly projectsWithIssueCount = computed(() => {
    const projects = this.projects();
    const issues = this.issues();

    return projects.map(project => ({
      ...project,
      issueCount: issues.filter(issue => issue.projectId === project.id).length
    }));
  });

  readonly recentProjects = computed(() => 
    [...this.projectsWithIssueCount()]
      .sort(
        (a, b) => 
          new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
      ).slice(0, 2)
  );

  readonly recentIssues = computed(() => 
    [...this.issues()]
      .sort(
        (a, b) => 
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      )
      .slice(0, 5)
      .map(issue => ({
        id: issue.id,
        key: issue.key,
        summary: issue.summary,
        status: issue.status
      }))
  );

  readonly issueActivities = computed<Activity[]>(() => {
    const issues = this.issues();
    const users = this.users();

    return issues.map(issue => {
      const user = users.find(user => user.id === issue.updatedById);

      const isCreated = issue.createdAt === issue.updatedAt;

      const isCompleted = 
        !isCreated && issue.status === 'Done';
      
      let action: ActivityAction;

      if (isCreated) {
        action = 'created issue';
      } else if (isCompleted) {
        action = 'completed';
      } else {
        action = 'updated issue'
      }

      return {
        id: `issue-${issue.id}-${action}`,
        userName: user?.fullName ?? 'Unknown user',
        avatarUrl: user?.avatarUrl ?? '',
        action,
        issueKey: issue.key,
        issueId: issue.id,
        issueSummary: issue.summary,
        occurredAt: issue.updatedAt
      }
    });
  });

  readonly commentActivities = computed<Activity[]>(() => {
    const comments = this.comments();
    const issues = this.issues();
    const users = this.users();

    return comments.map(comment => {
      const issue = issues.find(issue => issue.id === comment.issueId);

      const user = users.find(user => user.id === comment.authorId);

      if (!issue) {
        return null;
      }

      return {
        id: `comment-${comment.id}`,
        userName: user?.fullName ?? 'Unkknown user',
        avatarUrl: user?.avatarUrl ?? '',
        action: 'commented on',
        issueKey: issue.key,
        issueId: issue.id,
        issueSummary: issue.summary,
        occurredAt: comment.createdAt
      }
    }).filter((activity): activity is Activity => activity !== null);
  });

  readonly activities = computed<Activity[]>(() => {
    return [
      ...this.issueActivities(),
      ...this.commentActivities()
    ]
      .sort(
        (a, b) =>
          new Date(b.occurredAt).getTime() - 
          new Date(a.occurredAt).getTime()
      ).slice(0, 5);
  });

  getStatusClass(status: IssueStatus): string {
    switch (status) {
      case 'Todo':
        return 'status-todo';
      
      case 'In Progress':
        return 'status-in-progress';

      case 'In Review':
        return 'status-in-review';

      case 'Done':
        return 'status-done';
    }
  }
}

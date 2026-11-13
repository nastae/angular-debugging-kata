import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Issue } from '../../../core/api/models/issue.model';
import { IssueStatus } from '../../../core/api/models/issue-status.type';
import { Comment } from '../../../core/api/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {

  private readonly http = inject(HttpClient);

  getIssues() {
    return this.http.get<Issue[]>('/api/issues');
  }

  updateIssueStatus(issueId: string, status: IssueStatus) {
    return this.http.patch<Issue>(`/api/issues/${issueId}`, { status });
  }

  createIssue(issue: Issue) {
    return this.http.post<Issue>('/api/issues', issue);
  }

  getIssueById(id: string) {
    return this.http.get<Issue>(`/api/issues/${id}`);
  }

  updateIssue(issue: Issue) {
    return this.http.put<Issue>(
      `/api/issues/${issue.id}`,
      issue
    );
  }

  deleteIssue(id: string) {
    return this.http.delete<void>(
      `/api/issues/${id}`
    );
  }

  getComments(issueId: string) {
    return this.http.get<Comment[]>(
      `/api/issues/${issueId}/comments`
    );
  }

  addComment(comment: Comment) {
    return this.http.post<Comment>(
      `/api/issues/${comment.issueId}/comments`,
      comment
    );
  }
}

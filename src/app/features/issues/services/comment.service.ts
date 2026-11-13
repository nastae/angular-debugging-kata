import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Comment } from '../../../core/api/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  private readonly http = inject(HttpClient);

  getComments() {
    return this.http.get<Comment[]>('/api/comments');
  }
}

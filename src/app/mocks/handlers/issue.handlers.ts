import { http, HttpResponse } from "msw";
import { issues } from "../data/issues";
import { IssueStatus } from "../../core/api/models/issue-status.type";
import { Issue } from "../../core/api/models/issue.model";
import { projects } from "../data/projects";
import { comments } from "../data/comments";
import { Comment } from "../../core/api/models/comment.model";

export const issueHandlers = [

    http.get('/api/issues', () => {
        return HttpResponse.json(issues);
    }),

    http.patch(
        '/api/issues/:issueId', 
        async ({ params, request }) => {
            const issueId = String(params['issueId']);

            const body = await request.json() as {
                status: IssueStatus
            };

            const issue = issues.find(
                issue => issue.id === issueId
            );

            if (!issue) {
                return HttpResponse.json(
                    {
                        message: `Issue ${issueId} not found`
                    },
                    {
                        status: 404
                    }
                );
            }

            issue.status = body.status;
            issue.updatedAt = new Date().toISOString();

            return HttpResponse.json(issue);
        }
    ),

    http.post('/api/issues', async ({ request }) => {
        const issue = await request.json() as Issue;

        const project = projects.find(
            project => project.id === issue.projectId
        );

        if (!project) {
            return HttpResponse.json(
                { message: 'Project not found' },
                { status: 404 }
            );
        }

        const projectIssues = issues.filter(
            existingIssue => existingIssue.projectId === issue.projectId
        );

        const nextIssueNumber = projectIssues.reduce(
            (max, eixstingIssue) => {
                const number = Number(eixstingIssue.key.split('-').pop());
                
                return Number.isNaN(number) ? 
                    max :
                    Math.max(max, number);
            }, 0
        ) + 1;

        const now = new Date().toISOString();
        
        const newIssue: Issue = {
            ...issue,
            id: crypto.randomUUID(),
            key: `${project.key}-${nextIssueNumber}`,
            createdAt: now,
            updatedAt: now
        };

        issues.push(newIssue);

        return HttpResponse.json(newIssue, {
            status: 201
        });
    }),

    http.post('/api/issues/:id/comments', async ({ params, request }) => {
        const issueId = params['id'] as string;

        const issue = issues.find(
            issue => issue.id === issueId
        );

        if (!issue) {
            return HttpResponse.json(
                { message: 'Issue not found' },
                { status: 404 }
            );
        }

        const comment = await request.json() as Comment;

        const now = new Date().toISOString();

        const newComment: Comment = {
            ...comment,
            id: crypto.randomUUID(),
            issueId,
            createdAt: now
        };

        comments.push(newComment);

        return HttpResponse.json(
            newComment,
            { status: 201 }
        );
    }),

    http.get('/api/issues/:id', ({ params }) => {
        const issue = issues.find(
            issue => issue.id === params['id']
        );

        if (!issue) {
            return HttpResponse.json(
                { message: 'Issue not found' },
                { status: 404 }
            );
        }

        return HttpResponse.json(issue);
    }),

    
    http.get('/api/issues/:id/comments', ({ params }) => {
        const issueId = params['id'] as string;

        const issue = issues.find(
            issue => issue.id === issueId
        );

        if (!issue) {
            return HttpResponse.json(
                { message: 'Issue not found' },
                { status: 404 }
            );
        }

        return HttpResponse.json(
            comments.filter(
                comment => comment.issueId === issueId
            )
        );
    }),

    http.put('/api/issues/:id', async ({ params, request }) => {
        const id = params['id'];

        const index = issues.findIndex(
            issue => issue.id === id
        );

        if (index === -1) {
            return HttpResponse.json(
                { message: 'Issue not found' },
                { status: 404 }
            );
        }

        const updatedIssue = await request.json() as Issue;

        const now = new Date().toISOString();

        const issue: Issue = {
            ...issues[index],
            ...updatedIssue,
            id: issues[index].id,
            key: issues[index].key,
            createdAt: issues[index].createdAt,
            updatedAt: now
        };

        issues[index] = issue;

        return HttpResponse.json(issue);
    }),

    http.delete('/api/issues/:id', ({ params }) => {
        const id = params['id'];

        const index = issues.findIndex(
            issue => issue.id === id
        );

        if (index === -1) {
            return HttpResponse.json(
                { message: 'Issue not found' },
                { status: 404 }
            );
        }

        issues.splice(index, 1);

        return new HttpResponse(null, {
            status: 204
        })
    })
];
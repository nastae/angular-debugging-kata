import { User } from "../../../core/api/models/user.model";

export interface IssueTableRow {
    id: string;
    key: string;
    summary: string;

    projectId: number,
    projectKey: string;

    status: string;
    type: string;
    priority: string;

    assigneeId: string;
    assignee: User;

    updatedAt: string;
}

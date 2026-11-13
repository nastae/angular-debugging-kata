import { IssueStatus } from "./issue-status.type";
import { IssueType } from "./issue-type.type";
import { Priority } from "./priority.type";

export interface Issue {
    id: string;
    key: string;
    summary: string;
    description: string;
    projectId: number;

    assigneeId?: string;
    reporterId: string;

    createdById: string;
    updatedById: string;

    priority: Priority;
    status: IssueStatus;
    type: IssueType;

    createdAt: string;
    updatedAt: string;
}

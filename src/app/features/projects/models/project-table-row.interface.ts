import { User } from "../../../core/api/models/user.model";

export interface ProjectTableRow {
    id: number;
    key: string;
    name: string;

    lead: User;
    issueCount: number;
    createdAt: string;
}

export type ActivityAction = 
    | 'created issue'
    | 'updated issue'
    | 'completed'
    | 'commented on';

export interface Activity {
    id: string;
    userName: string;
    avatarUrl: string;
    action: ActivityAction;
    issueKey: string;
    issueId: string;
    issueSummary: string;
    occurredAt: string;
}

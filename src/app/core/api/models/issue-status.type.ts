export const ISSUE_STATUSES = [
    'Todo',
    'In Progress',
    'In Review',
    'Done'
] as const;

export type IssueStatus = typeof ISSUE_STATUSES[number];
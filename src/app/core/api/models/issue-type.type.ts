export const ISSUE_TYPES = [
    'Story',
    'Task',
    'Bug',
    'Epic'
] as const;

export type IssueType = typeof ISSUE_TYPES[number];
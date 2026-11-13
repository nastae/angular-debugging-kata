export const PRIORITIES = [
    'Lowest',
    'Low',
    'Medium',
    'High',
    'Highest'
] as const;

export type Priority = typeof PRIORITIES[number];
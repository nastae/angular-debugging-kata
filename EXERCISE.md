# Exercise 1: Fix Project Issue Counts

**Branch**: exercise-1
**Difficulty**: Beginner
**Topic**: JavaScript Array Filtering

## Issue
The Dashboard displays an incorrect number of issues for each project on recent projects view.

For example, if the Analytics Dashboard project has 10 issues, its dashboard card should display 10 issues.

However, the displayed issue counts are incorrect.

## Expected behavior

- On recent projects view, each project should display the number of issues belonging to that project.
- Issues belonging to other projects should not be included.
- A project without any issues should display 0 issues.

## Hints

### Hint 1

#### Where to look
Open:
```
src/app/features/dashboard/dashboard.component.ts
```
Find the projectsWithIssueCount computed property.

It calculates the number of issues belonging to each recent project.

#### Your task
Find and fix the bug in the issue-count calculation.

Do not change the HTML, CSS, services, or data models. The problem is in the TypeScript calculation.

### Acceptance criteria
- [ ] Each project displays its correct issue count.
- [ ] Issues from other projects are not included.
- [ ] Projects without issues display 0.
- [ ] The calculation updates when the projects or issues signals change.

### Hint 2
Look closely at the condition inside the filter() method.

Ask yourself:
- What does filter() return?
- Which property connects an issue to its project?
- Should the issue's project ID be equal to or different from the current project's ID?
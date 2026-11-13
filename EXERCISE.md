# Exercise 5: Fix Assigned Issue Counts on the Users Page

- **Branch**: exercise-5
- **Difficulty**: Intermediate
- **Topic**: TypeScript Array Filtering and Data Relationships

## Problem
The Users page displays incorrect assigned issue counts.

The Assigned Issues column shows how many issues are associated with each user, but the numbers do not reflect the issues actually assigned to them.

The statistics cards are also affected because they depend on these counts.

Your task is to investigate how assigned issue counts are calculated and fix the problem.

## Expected behavior
- Each user displays the number of issues assigned to them.
- Issues assigned to other users are not included in their count.
- Users without assigned issues display 0.
- The Most Assigned statistic displays the user with the highest number of assigned issues.
- Users with Assigned Issues and Active Users statistics display correct values.

## Hints
### Hint 1
#### Where to look
Open:
```
src/app/features/users/users.component.ts
```
Find the rows$ observable.

Look inside the map() operator where assignedIssueCount is calculated.

Pay attention to which issue property is used to identify the assigned user.

#### Your task
Fix the assigned issue count calculation so that it counts issues assigned to each user.

Do not change the HTML, CSS, services, or data models.

#### Acceptance criteria
- [ ] Assigned issue counts are calculated correctly.
- [ ] Each issue is counted for its assigned user.
- [ ] Issues reported by a user but assigned to someone else are not counted.
- [ ] Users without assigned issues display 0.
- [ ] The Most Assigned statistic displays the correct user.
- [ ] Users with Assigned Issues and Active Users statistics display correct values.

### Hint 2
Look at the Issue model. Which property identifies the user assigned to an issue?

### Hint 3
Look at the Issue model. Which property identifies the user assigned to an issue?

### Hint 4
Check which property you use inside the issues.filter() condition.

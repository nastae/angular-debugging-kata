# Exercise 3: Fix Users Search

- **Branch**: exercise-3
- **Difficulty**: Beginner
- **Topic**: Angular Signals and JavaScript Array Filtering

## Problem
The search field on the Users page does not work correctly.

When you search for a user's name or email address, matching users disappear from the table instead of being displayed.

Your task is to find and fix the problem in the filteredRows computed property.

## Expected behavior
- Searching by a user's full name displays matching users.
- Searching by email address displays matching users.
- Search is case-insensitive (e.g. john and John return the same results).
- Non-matching users are hidden.
- Clearing the search displays all users again.
- Assigned/unassigned filtering continues to work.

## Hints

### Hint 1

#### Where to look
Open:
```
src/app/features/users/users.component.ts
```

Find the filteredRows computed property.

Pay attention to the matchesSearch condition and how its boolean value is used.

#### Your task
Fix the search functionality without changing the HTML, CSS, services, or data models.

#### Acceptance criteria
- [ ] Searching by full name displays matching users.
- [ ] Searching by email displays matching users.
- [ ] Search is case-insensitive.
- [ ] Non-matching users are hidden.
- [ ] Clearing the search displays all users.
- [ ] Assigned/unassigned filtering still works.

### Hint 2
Look at the matchesSearch variable. It tells you whether a user matches the search term.

### Hint 3
Check the if condition that uses matchesSearch. Should matching users be kept or removed from the results?

### Hint 4
Pay attention to the ! operator. It reverses a boolean value (true becomes false, and vice versa).

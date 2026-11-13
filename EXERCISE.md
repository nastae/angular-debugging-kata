# Exercise 3: Fix Comment Author Lookup

- **Branch**: exercise-3
- **Difficulty**: Intermediate
- **Topic**: JavaScript Map and Data Relationships

## Problem

The Comments tab displays comments, but the authors' names and avatars are missing.

The comments themselves are loaded correctly. However, the application cannot find the users associated with those comments.

Your task is to investigate how comment authors are stored and retrieved.

## Expected behavior
- Each comment displays its author's full name.
- Each comment displays its author's avatar.
- Comments are associated with the correct users.
- Comments without a matching user do not cause errors.

## Hints

### Hint 1
#### Where to look
Open:
```
src/app/features/issues/issue-details/issue-details.component.ts
```

Find these two methods:
```
loadIssue() – where commentAuthors is populated.
getUser() – where a comment author is retrieved.
```
Pay attention to the keys used when storing and retrieving users from the Map.

#### Your task
Fix the comment author lookup so that each comment can find its author correctly.

Do not change the HTML, CSS, services, or data models.

#### Acceptance criteria
- [ ] Comment authors' names are displayed.
- [ ] Comment authors' avatars are displayed.
- [ ] Each comment displays the correct author.
- [ ] Comments are still displayed when an author cannot be found.
- [ ] No unnecessary changes to other functionality.

### Hint 2
Look at how commentAuthors is populated in loadIssue().

### Hint 3
The getUser() method searches the map using comment.authorId.

What key does the map use when storing users?

### Hint 4
Make sure the key used when storing a user is the same type of identifier used when retrieving that user.
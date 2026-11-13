# Exercise 4: Fix Issue Summary Validation

- **Branch**: exercise-4
- **Difficulty**: Intermediate
- **Topic**: Angular Reactive Forms and Validators

## Problem
The Create Issue and Edit Issue dialogs allow users to submit an issue without entering a summary.

An issue summary should be mandatory so that every issue has a meaningful title.

Currently, the form considers an empty summary valid, allowing users to create or update issues without one.

Your task is to investigate the summary form control and restore the required validation.

## Expected behavior
- Issue summary is required.
- Users cannot create an issue without a summary.
- Users cannot update an issue with an empty summary.
- Summaries containing only whitespace are not accepted.
- Summary cannot exceed 200 characters.
- The validation works in both Create Issue and Edit Issue modes.

## Hints
### Hint 1
#### Where to look
Open:
```
src/app/features/issues/dialogs/issue-dialog/issue-dialog.component.ts
```

Find the summary form control inside the form definition.

Pay attention to the validators applied to this control.

#### Your task
Fix the summary validation so that users must provide a summary before submitting the form.

Do not change the HTML, CSS, services, or data models.

#### Acceptance criteria
- [ ] Empty summaries are rejected.
- [ ] Summaries containing only whitespace are rejected.
- [ ] Valid summaries can be submitted.
- [ ] Summaries longer than 200 characters are rejected.
- [ ] Validation works in Create Issue mode.
- [ ] Validation works in Edit Issue mode.
- [ ] The submit button remains disabled when the form is invalid.

### Hint 2
Look at the validators applied to the summary form control.

### Hint 3
Which Angular validator ensures that a form control must have a value?

### Hint 4
Consider Validators.required.

Also think about whether this validator alone rejects a value containing only spaces.
# Angular Debugging Kata
A hands-on Angular debugging practice project built with **Angular 22**.

The goal is to practice debugging a real Angular application by finding and fixing bugs in intentionally broken exercises.

## Repository structure
- **main** – The working version of the application. Use it to understand how the project should work.

### Exercise branches
Each exercise branch contains bugs that you need to identify and fix.

- exercise-1
- exercise-2
- exercise-3
- exercise-4
- exercise-5

### Exercise answer branches
Each answer branch contains one possible solution for its corresponding exercise.

- exercise-1-answer
- exercise-2-answer
- exercise-3-answer
- exercise-4-answer
- exercise-5-answer

**Every exercise branch contains an EXERCISE.md file**. Read it before starting. It explains what needs to be fixed, provides suggestions, and includes additional information required to complete the exercise.

This is a demo kata to see whether developers find this kind of debugging practice useful. More exercises may be added later.

## Requirements

Before starting, install:
- **Git** – To clone the repository and switch between branches.
- **Node.js** – Use a version compatible with Angular 22.
- **npm** – Installed automatically with Node.js.
- **Terminal** – PowerShell, Command Prompt, or another terminal.

You do not need to install Angular CLI globally. The project uses its locally installed Angular dependencies.

### Installation
1. Install [Node.js](https://nodejs.org/). Choose a version supported by [Angular 22](https://angular.dev/reference/versions).
2. Verify Node.js and npm:
```
node --version
```
```
npm --version
```
3. Install Git and verify:
```
git --version
```
4. Clone the repository:
```
git clone <repository-url>
cd <repository-folder>
```
5. Switch to the working branch and install dependencies:
```
git switch main
npm install
```

## Running the application
Start the development server:
```
npm start
```
Open the URL displayed in your terminal (usually http://localhost:4200).

## How to start an exercise
For example, to work on Exercise 1:
```
git switch exercise-1
npm install
npm start
```

**Before debugging, open EXERCISE.md** in the repository root. Follow its instructions to understand the task, requirements, and suggestions.

To try another exercise, switch to its branch:
```
git switch exercise-2
```
Replace exercise-2 with the exercise branch you want to try.

**Tip**: Start each exercise from its own branch. Keep your changes there so you can compare your solution with the provided answer.

## Comparing your solution with the answer
After completing Exercise 1, you can compare your changes with the exercise-1-answer branch.

While on exercise-1, run:
```
git diff exercise-1-answer
```
This compares your current working tree (including local changes) with the answer branch.

To compare the two branches' committed changes instead:
```
git diff exercise-1..exercise-1-answer
```

You can also switch to the answer branch to inspect its implementation:
```
git switch exercise-1-answer
```
Use the corresponding answer branch for each exercise (for example, exercise-2-answer for exercise-2).

**Important**: An answer branch shows one possible solution, not necessarily the only correct one. There may be multiple valid ways to fix the same bug.

Try solving the exercises yourself before looking at the answers.

# License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
See the [LICENSE](LICENSE) file for details.

# Have fun debugging!
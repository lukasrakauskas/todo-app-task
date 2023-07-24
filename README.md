# Task

A junior colleague went on vacation and handed over a half-done application for you to finish.

He is a very keen learner and benefits a lot from good feedback. Please finish the application and <b>provide a thorough review</b>, touching on all of the issues with the code, explaining the what and the why. Feel free to refactor anything you deem appropriate.

This is a basic TODO list application. Requirements are as such:

- Should keep a list of tasks which can be "active" and "completed"
- New task is added as "active"
- Clicking on "active" task marks it as "completed" by crossing it out
- Should show a total count of all tasks in the list
- Name for a new task is specified by typing in an input field
- There should be a backend service (node.js), which enables data persistence
- Data storage in firebase (https://firebase.google.com/)

If there is anything unclear about the exact requirements, use your best judgement.
Styling of the application is not important, and there will be no additional benefit in extending the application beyond the original requirements.

# Development

Firestore structure should be updated with a `createdAt` timestamp field.

Before starting development server, one should copy .env.example in both projects

```
cp apps/frontend/.env.example cp apps/frontend/.env
cp apps/backend/.env.example cp apps/backend/.env
```

In the backend .env file you should point to your firebase credentials json file.

Then you can start development servers by running 

```
pnpm dev
```

# Review

### Issues

- Marking a task as complete does not remove it from active array, causing a bug of multiple todos.
- Since state is outside of Tasks component, so should be the event of adding a new task. It would prevent the aforementioned bug. And there would be no need to force an update, since the change of props would cause the component to rerender.
- Props should not be passed to state, it's an anti-pattern. You can derive the required values in render function directly.
- State and props should not be mutated directly when adding a task, use setState method.
- Mix of functional and class based components, prefer to use functional style for all components.
- Key prop is not added in lists
- Avoid creating large components that do a lot of things. Follow solid responsibility principle, it should help to create simple components and maintainable code.
- Enum status over boolean would allow for easier updates. What if there is a new state for a task?
- Dont shy from giving larger names to variables and components. It allows other developers to understand your code easier.
- Try to keep consistency in the codebase. Task has property `done`, Tasks component has state `completed` and by the end a `Done` styled component is used.

### Chores

Project overall lacks a set up that would prevent many failures. Heres some chores for a smooth sailing project.

- Add Typescript
- Add a formatter
- Add .gitignore file. We don't want to clog our CI or servers with node_modules.
- Add lockfile. Helps to avoid "works on my machine" situations.
- Use Styled Components global styles instead of a css file. This could avoid style conflicts and using a single strategy is always a best practice.
- Update outdated packages. It's best to avoid a vulnerability before there's a huge risk.

### Nitpicks

- Create React App is not the recommended way to start a new application as per React docs. I recommend to use Vite.
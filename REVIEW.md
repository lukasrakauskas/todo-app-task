### Issues

- Marking a task as complete does not remove it from active array, causing a bug of multiple todos.
- Since state is outside of Tasks component, so should be the event of adding a new task. It would prevent the aforementioned bug. And there would be no need to force an update, since the change of props would cause the component to rerender.
- Props should not be passed to state. You can derive the required values in render function.
- State and props should not be mutated directly when adding a task, use setState method.
- Mix of functional and class based components, prefer to use functional style for all components.
- Key prop is not added in lists

### Chores

- Add Typescript
- Add a formatter
- Add .gitignore file
- Add lockfile
- Use Styled Components global styles instead of a css file, so that styles are added in an unanimous way
- Update outdated packages

### Nitpicks

- Everything should not be in a single file, although it should be a team agreement. For a small scale application collocation does not seem that bad.
- Create React App is not the recommended way to start a new application as per React docs. I recommend to use Vite.
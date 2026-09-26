# React state

Adding logic to the dashboard: local state, controlled components, the Context
API, lifting state up, and a first React Hook.

Each task folder holds a complete `dashboard/` app and builds on the one before
it. `task_0` starts from the last task of *React inline styling*. Run
`npm install` inside a task folder, then:

```
npm run start-dev   # webpack-dev-server on http://localhost:3000
npm run build       # bundle into dist/
npm test            # jest + enzyme
```

## Learning objectives

* What the state of a component or a container is
* The lifecycle of a component
* How to modify a state and execute code in the right order
* What a controlled component is
* How to use Forms in React
* How to reuse smaller components, keep them pure, and lift state to containers
* The use of a React Hook and how to create one
* How to test State changes with Enzyme

## Tasks

### task_0 — Local state for notifications

`App` holds `displayDrawer` in its state, with bound `handleDisplayDrawer` and
`handleHideDrawer` passed down to `Notifications`. Clicking *Your notifications*
opens the panel, the close button hides it.

`shouldComponentUpdate` had to grow a second condition — it previously only
rerendered when the notification list got longer, which would have swallowed
every `displayDrawer` change:

```js
nextProps.listNotifications.length > this.props.listNotifications.length ||
nextProps.displayDrawer !== this.props.displayDrawer
```

### task_1 — Controlled components and state callback

`Login` becomes a class holding `email`, `password`, `enableSubmit` and
`isLoggedIn`. The inputs are wrapped in a `form`, the button is an
`input type="submit"`, and both inputs are controlled — their value comes from
state and `handleChangeEmail` / `handleChangePassword` write back to it.

`enableSubmit` is recomputed from the `setState` **callback**, so the check
always reads the value the user just typed rather than the previous render's:

```js
this.setState({ email: event.target.value }, this.updateEnableSubmit);
```

The submit button is disabled whenever either field is empty, including after a
field is cleared again.

### task_2 — Context

`AppContext.js` exports a default `user` (`email`, `password`, `isLoggedIn`), a
default `logOut` function, and the context built from both.

`App` keeps `value: { user, logOut }` in its state and wraps the tree in
`AppContext.Provider`. `logIn(email, password)` and `logOut()` update that state;
the `isLoggedIn` and `logOut` **props** are gone, and `ctrl` + `h` now calls the
container's own `logOut`. `Login` no longer tracks `isLoggedIn` — it calls
`this.props.logIn` on submit.

`Header` is a class using `Header.contextType = AppContext` and renders
`#logoutSection` — *Welcome email (logout)* — only when the context user is
logged in. Enzyme cannot drive the static context API, so the tests mount the
component inside a `Context.Provider` rather than using `setContext`.

The provider is given `this.state.value` directly, never a fresh object literal,
so context identity stays stable between renders.

### task_3 — Context consumer and advanced state

`Footer` stays a function component and subscribes through
`AppContext.Consumer`, showing a *Contact us* link once the user is logged in.

`App` moves `listNotifications` into state and owns
`markNotificationAsRead(id)`, which filters the notification out. `Notifications`
drops its own `markAsRead` and its `shouldComponentUpdate` and becomes a
`PureComponent` — it only reads props now, so the shallow prop compare is enough.

### task_4 — React Hook

`CourseListRow` uses `useState` for a per-row `checked` flag. Simple rows get a
checkbox in the first cell, and a checked row switches from `row` to the new
`rowChecked` style (`#e6e4e4`). The component stays a function — no class.

## Testing

Test counts per task: 57, 63, 68, 73, 77 — all passing.

The whole flow was also driven in a browser: opening and closing the drawer,
clicking a notification to remove it, the submit button enabling only when both
fields are filled, logging in to swap `Login` for `CourseList`, the header
welcome line and the footer link appearing, checking a row to repaint it, and
logging out again.

## Author

Mugisha Joshua

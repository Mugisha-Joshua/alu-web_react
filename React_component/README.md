# React component

Class components, lifecycle methods, event handling, reusable components,
higher-order components and render optimisation, built on the dashboard from
*React props*.

Each task folder holds a complete `dashboard/` app. Run `npm install` inside the
task you want to work on, then:

```
npm run start-dev   # webpack-dev-server on http://localhost:3000
npm run build       # production bundle into dist/
npm test            # jest + enzyme
```

## Learning objectives

* When to use a Class or a function to create a component
* The lifecycle of a Class component
* How to test a component
* How to utilize a Jest spy to verify that a function is being called correctly
* What an HOC is and how to use it
* How to optimize performance and control which components to render

## Tasks

| Task | What changes |
| ---- | ------------ |
| `task_0` | `App` becomes a `React.Component` class |
| `task_1` | `App` gains a `logOut` prop plus `componentDidMount`/`componentWillUnmount` listeners: `ctrl` + `h` alerts *Logging you out* and calls `logOut` |
| `task_2` | `Notifications` becomes a class with a bound `markAsRead(id)`; `NotificationItem` calls it from the `li` `onClick` |
| `task_3` | `BodySection` (containment) and `BodySectionWithMarginBottom` (specialisation, spread props); `App` wraps `CourseList` and `Login`, and adds a *News from the School* section |
| `task_4` | `WithLogging` HOC logging mount/unmount, with `displayName` set to `WithLogging(NAME)`; applied to `Login` in `App` |
| `task_5` | `NotificationItem` wrapped in `React.memo`; `Notifications.shouldComponentUpdate` only rerenders when `listNotifications` grows |

## Testing

Enzyme drives the tests through `config/setupTests.js`. Jest maps CSS imports to
`identity-obj-proxy` and image imports to `config/fileMock.js`, so components can
import their own styles and assets.

Test counts per task: 31, 33, 35, 39, 42, 44 — all passing.

## Note on versions

The project targets Node 12 / npm 6, so the dashboard pins React 16.14 with
`enzyme-adapter-react-16`. `cheerio` is pinned to `1.0.0-rc.3` because Enzyme's
open range otherwise pulls a release that Jest cannot load.

## Author

Mugisha Joshua

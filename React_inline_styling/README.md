# React inline styling

Styling the dashboard without CSS files: inline styles, Aphrodite (CSS-in-JS),
conditional styling, responsive design with media queries, and CSS animations.

`task_0` starts from the last task of *React component* and each task builds on
the previous one. Run `npm install` inside a task folder, then:

```
npm run start-dev   # webpack-dev-server on http://localhost:3000
npm run build       # production bundle into dist/
npm test            # jest + enzyme
```

## Learning objectives

* The differences between using a CSS file and inline styling
* How to use a CSS-in-JS tool like Aphrodite
* How to use conditions within JS to apply different styles
* How to use responsive design and show a different UI according to screen size
* How to create small animations within the app

## Tasks

### task_0 — Inline styling

`CourseListRow` gets its row colours from plain inline styles, held in a module
level constant rather than an object literal built during render:
`#deb5b545` for header rows, `#f5f5f5ab` for the rest.

### task_1 — Aphrodite

`App`, `BodySectionWithMarginBottom`, `CourseList`, `Header`, `Login` and
`Notifications` move to `StyleSheet.create` / `css()`. `App.css`, `Header.css`,
`Login.css` and `BodySection.css` are deleted; `CourseList.css` and
`Notifications.css` keep only what has not moved yet. The UI is unchanged.

Test suites call `StyleSheetTestUtils.suppressStyleInjection()` in `beforeEach`
and `clearBufferAndResumeStyleInjection()` in `afterEach` — without it Aphrodite
flushes styles after jsdom has been torn down and the suite crashes.

### task_2 — Conditionally applying style

`NotificationItem` picks `urgent` or `default` styling from its `type` prop, and
`CourseListRow` picks row and cell styling from `isHeader`. Both render a single
element and vary it with conditions instead of duplicating markup — the cell tag
itself is chosen with `const CellTag = isHeader ? 'th' : 'td'`. `Notifications.css`
and `CourseList.css` are gone.

### task_3 — Responsive design

Under `@media (max-width: 900px)`:

* `Login` puts each label/input pair on its own line and the button on a new line
* `Notifications` takes over the screen (`position: fixed`, full width and height),
  the `ul` loses its padding, and text is `20px`
* `NotificationItem` fills the width, gets a black bottom border, `20px` text and
  `10px 8px` padding

### task_4 — Animation

Two keyframe objects live in `Notifications.js`: `opacityKeyframes` (0.5 → 1) and
`bounceKeyframes` (`translateY` 0 → -5px → 5px). The menu item floats right above
everything on `#fff8f8`, shows a pointer cursor, and on hover runs both animations
— 1s for the opacity, 0.5s for the bounce, 3 iterations. When the drawer is open
the menu item is hidden.

## Viewing the notifications panel

`task_3` and `task_4` render `<Notifications displayDrawer={true} />` from `App`
so the open panel — the one the responsive and animation work is about — is
visible in the browser. Drop that prop to see the closed state.

## Testing

Test counts per task: 46, 46, 49, 49, 50 — all passing.

## Author

Mugisha Joshua

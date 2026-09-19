# Webpack

Module bundling with Webpack, from a zero-config build up to a multi-entry
dashboard with CSS, images, code splitting and a dev server.

All tasks target the versions used by the project: **Node 12.x**, **Webpack 4**,
`webpack-cli` 3 and `webpack-dev-server` 3. Every task is a self-contained npm
package — run `npm install` inside the task folder before building it.

## Learning objectives

* How to setup Webpack for a basic project
* Entry points, output, and loaders
* How to add plugins
* How to split your code into chunks
* How to setup a dev server

## Tasks

### task_0 — Basic setup

Zero-config build: no `webpack.config.js` at all, so Webpack uses its defaults
(`./src/index.js` as entry, `dist/main.js` as output). `src/index.js` imports
jQuery and appends the three dashboard paragraphs to the body.

```
npm install
npm run build      # webpack --mode production -> dist/main.js
```

Open `dist/index.html` in a browser. It loads a single script, `main.js`.

### task_1 — Webpack with a config file

Adds `webpack.config.js`: entry `./js/dashboard_main.js`, output `bundle.js`
inside `public/`, mode `production`.

`js/dashboard_main.js` builds the page with jQuery (two paragraphs, a button, a
`<p id="count">` and the copyright line) and keeps a click counter. The counter
is wrapped in Lodash `debounce`, so spamming the button only registers one
click per 500 ms.

```
npm install
npm run build      # -> public/bundle.js
```

Open `public/index.html`.

### task_2 — Adding CSS and images

Same app as task_1 plus styling:

* `style-loader` + `css-loader` inline `css/main.css` into the bundle.
* `file-loader` emits `assets/holberton-logo.jpg` next to the bundle, and
  `image-webpack-loader` compresses it on the way through (8.6 KB -> 5.8 KB),
  which also keeps the build under the asset size limit, so Webpack prints no
  `asset size limit` warning.
* `#logo` sits at the top of the document, 200x200 px, with the logo as a
  200x200 px background.
* `#count` is bold and `inline-block`, so it renders to the right of the button.

```
npm install
npm run build      # -> public/bundle.js + public/holberton-logo.jpg
```

### task_3 — Dev server, modules and chunks

The page is split into three modules, each with its own JS and CSS:

| Module   | Content                                               |
| -------- | ----------------------------------------------------- |
| `header` | logo + `<h1>Holberton Dashboard</h1>`, logs `Init header` |
| `body`   | paragraph, button and the debounced click counter      |
| `footer` | `Copyright - Holberton School`                         |

Config highlights:

* Three entry points emitting `[name].bundle.js` into `public/`.
* `mode: 'development'` with `devtool: 'inline-source-map'`, so the
  `console.log('Init header')` in the console links back to `header.js`.
* `devServer` on port **8564** with `open: true`.
* `HtmlWebpackPlugin` generates `public/index.html` and injects every bundle.
* `CleanWebpackPlugin` empties `public/` on each build.
* `optimization.splitChunks: { chunks: 'all' }` pulls jQuery and Lodash out of
  the three entry bundles into shared vendor chunks.

```
npm install
npm run build      # -> public/
npm run start-dev  # http://localhost:8564/
```

`public/` is generated, so it is not committed.

## Note on newer Node versions

The project is built for Node 12. Webpack 4 also runs on modern Node (18/20/22)
as long as `webpack@4.47.0` or later is installed — that release replaced the
`md4` hash that OpenSSL 3 no longer provides. The `package.json` files therefore
depend on `^4.46.0`, which resolves to 4.47.x. With an older 4.x pin on Node 17+
you would need `NODE_OPTIONS=--openssl-legacy-provider`.

## Files

```
task_0/  package.json, src/index.js, dist/index.html
task_1/  package.json, webpack.config.js, js/dashboard_main.js, public/index.html
task_2/  package.json, webpack.config.js, js/dashboard_main.js, css/main.css,
         assets/holberton-logo.jpg, public/index.html
task_3/  package.json, webpack.config.js, assets/holberton-logo.jpg,
         modules/{header,body,footer}/{*.js,*.css}
```

## Author

Mugisha Joshua

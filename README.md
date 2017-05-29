[![Travis](https://img.shields.io/travis/mediamonks/seng-device-state-tracker.svg?maxAge=2592000)](https://travis-ci.org/mediamonks/seng-device-state-tracker)
[![Code Climate](https://img.shields.io/codeclimate/github/mediamonks/seng-device-state-tracker.svg?maxAge=2592000)](https://codeclimate.com/github/mediamonks/seng-device-state-tracker)
[![Coveralls](https://img.shields.io/coveralls/mediamonks/seng-device-state-tracker.svg?maxAge=2592000)](https://coveralls.io/github/mediamonks/seng-device-state-tracker?branch=master)
[![npm](https://img.shields.io/npm/v/seng-device-state-tracker.svg?maxAge=2592000)](https://www.npmjs.com/package/seng-device-state-tracker)
[![npm](https://img.shields.io/npm/dm/seng-device-state-tracker.svg?maxAge=2592000)](https://www.npmjs.com/package/seng-device-state-tracker)

# seng-device-state-tracker

Add a description here...


## Installation

### yarn / npm

```sh
yarn add seng-device-state-tracker
```

```sh
npm i -S seng-device-state-tracker
```

### other

We also have browser, amd, commonjs, umd, systemjs and es6 versions of
this module available attached to the [Github Releases](https://github.com/mediamonks/seng-device-state-tracker/releases).

<!---

Note: The below cannot be used yet, as there is no way to link to a
specific version yet without updating this readme manually after each
new version.


### browser

```html
<script src="http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker.min.js"></script>
```
```js
console.log(window.SengDeviceStateTracker)
```

### other

Besides the browser version, there are other versions available for
download as well:

- [browser](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker.js) (and [minified](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker.min.js))
- [umd](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker.js) (and [minified](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker-umd.min.js))
- [amd](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker-amd.js)
- [commonjs](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker-commonjs.js)
- [systemjs](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker-system.js)
- [es6](http://mediamonks-development.s3.amazonaws.com/seng/libs/seng-device-state-tracker/1.2.0/seng-device-state-tracker-es6.zip)

-->

### manual

Check the **build** section below to see your you can build for all the
targets yourself.

## Usage

```ts
import SengDeviceStateTracker from 'seng-device-state-tracker';
// import SengDeviceStateTracker from 'seng-device-state-tracker/lib/classname';

// do something with SengDeviceStateTracker
```


## Documentation

View the [generated documentation](http://mediamonks.github.io/seng-device-state-tracker/).


## Building

In order to build seng-device-state-tracker, ensure that you have [Git](http://git-scm.com/downloads)
and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/mediamonks/seng-device-state-tracker.git
```

Change to the seng-device-state-tracker directory:
```sh
cd seng-device-state-tracker
```

Install dev dependencies:
```sh
yarn
```

Use one of the following main scripts:
```sh
yarn build           # build this project
yarn dev             # run dev-watch mode, serving example/index.html in the browser
yarn generate        # generate all artifacts (compiles ts, webpack, docs and coverage)
yarn typings         # install .d.ts dependencies (done on install)
yarn test:unit       # run the unit tests
yarn validate        # runs validation scripts, including test, lint and coverage check
yarn lint            # run tslint on this project
yarn doc             # generate typedoc documentation
```

When installing this module, it adds a pre-push hook, that runs the `validate`
script before committing, so you can be sure that everything checks out.

If you want to create the distribution files yourself, you can run the
`build-dist` script, and the following files will get generated in the
`dist` folder:

- **/dist/seng-device-state-tracker.js**: bundled with webpack, can be loaded from
	a script tag, available as `window.SengDeviceStateTracker`
- **/dist/seng-device-state-tracker.min.js**: same as above, but minified
- **/dist/seng-device-state-tracker-amd.js**: bundled with webpack, can be used
	with e.g. requirejs
- **/dist/seng-device-state-tracker-commonjs.js**: bundled with webpack, can be
	used in systems that support commonjs, but you should just use npm
- **/dist/seng-device-state-tracker-umd.js**: bundled with webpack, works in the
	browser, with requirejs, and in a commonjs system
- **/dist/seng-device-state-tracker-umd.min.js**: same as above, but minified
- **/dist/seng-device-state-tracker-system.js**: bundled with typescript, can be
	used in systems	that support systemjs
- **/dist/seng-device-state-tracker-es6.zip**: transpiled with typescript, only
	types are removed from the source files

## Contribute

View [CONTRIBUTING.md](./CONTRIBUTING.md)


## Changelog

View [CHANGELOG.md](./CHANGELOG.md)


## Authors

View [AUTHORS.md](./AUTHORS.md)


## LICENSE

[MIT](./LICENSE) © MediaMonks



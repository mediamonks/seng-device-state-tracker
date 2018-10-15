[![Travis](https://img.shields.io/travis/mediamonks/seng-device-state-tracker.svg?maxAge=2592000)](https://travis-ci.org/mediamonks/seng-device-state-tracker)
[![Code Climate](https://img.shields.io/codeclimate/github/mediamonks/seng-device-state-tracker.svg?maxAge=2592000)](https://codeclimate.com/github/mediamonks/seng-device-state-tracker)
[![Coveralls](https://img.shields.io/coveralls/mediamonks/seng-device-state-tracker.svg?maxAge=2592000)](https://coveralls.io/github/mediamonks/seng-device-state-tracker?branch=master)
[![npm](https://img.shields.io/npm/v/seng-device-state-tracker.svg?maxAge=2592000)](https://www.npmjs.com/package/seng-device-state-tracker)
[![npm](https://img.shields.io/npm/dm/seng-device-state-tracker.svg?maxAge=2592000)](https://www.npmjs.com/package/seng-device-state-tracker)

# seng-device-state-tracker

DeviceStateTracker is a utility class that tracks which media query is currently active using the matchMedia API.

## Installation

```sh
yarn add seng-device-state-tracker
```

```sh
npm i -S seng-device-state-tracker
```

## Usage information
When using max-width media queries make sure to set the DeviceStateTracker in reverse order, set the 
reverseDeviceStateOrder boolean truthy when initializing the DeviceStateTracker class.
 
To keep track of the currently selected media query set the stateIndicator boolean truthy. This will add a unstyled
div element to the DOM.  

## Example configuration for deviceStateTracker
```js
const config = {
	mediaQueries: {
		X_SMALL: '(max-width: 479px)',
		SMALL: '(min-width: 480px)',
		MEDIUM: '(min-width: 768px)',
		LARGE: '(min-width: 1024px)',
	},
	deviceState: {
		X_SMALL: 0,
		SMALL: 1,
		MEDIUM: 2,
		LARGE: 3,
	},
	// When the keys below aren't set it will default to false for these options 
	showStateIndicator: true,
	reverseDeviceStateOrder: false,
};
```

## Usage TypeScript

**Configuration**
```ts
/**
 * Object with available media queries
 */
export const mediaQueries:IMediaQuery = {
	X_SMALL: '(max-width: 479px)',
	SMALL: '(min-width: 480px)',
	MEDIUM: '(min-width: 768px)',
	LARGE: '(min-width: 1024px)',
	MEDIUM_ISOLATE: '(min-width: 768px) and (max-width: 1023px)',
};

/**
 * This enum is used by the DeviceStateTracker class to determine which of the media queries in
 * the mediaQueries object above are considered 'device states'. Names of this enum have to
 * correspond with one of the keys in the mediaQueries object. When using the DeviceStateTracker,
 * make sure you have enough device states so that there will always be one with a matching media query.
 */
export enum DeviceState {
	X_SMALL,
	SMALL,
	MEDIUM,
	LARGE,
}
```

**Usage**
```ts
import DeviceStateTracker, { DeviceStateEvent } from 'seng-device-state-tracker';
import { mediaQueries, DeviceState } from './path/to/config/deviceStateConfig';

const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker({
	mediaQueries,
	deviceState: DeviceState,
});

// Retrieve the current state after initialisation
const { state, name } = deviceStateTracker.currentDeviceState;

deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, (event:DeviceStateEvent) => {
	if (event.data.state === DeviceState.SMALL) {
		console.log('Matched', event.data.name);
	}
});
```

## Usage JavaScript

**Configuration**
```js
export const mediaQueries = {
	X_SMALL: '(max-width: 479px)',
	SMALL: '(min-width: 480px)',
	MEDIUM: '(min-width: 768px)',
	LARGE: '(min-width: 1024px)',
	MEDIUM_ISOLATE: '(min-width: 768px) and (max-width: 1023px)',
};

/**
 * This enum is used by the DeviceStateTracker class to determine which of the media queries in
 * the mediaQueries object above are considered 'device states'. Names of this enum have to
 * correspond with one of the keys in the mediaQueries object. When using the DeviceStateTracker,
 * make sure you have enough device states so that there will always be one with a matching media query.
 */
export const DeviceState = {
	X_SMALL: 0,
	SMALL: 1,
	MEDIUM: 2,
	LARGE: 3,
};
```

**Usage**
```js
import DeviceStateTracker, { DeviceStateEvent } from 'seng-device-state-tracker';
import { mediaQueries, DeviceState } from './path/to/config/deviceStateConfig';

const deviceStateTracker = new DeviceStateTracker({
	mediaQueries,
	deviceState: DeviceState,
});

// Retrieve the current state after initialisation
const { state, name } = deviceStateTracker.currentDeviceState;

deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, (event) => {
	if (event.data.state === DeviceState.SMALL) {
		console.log('Matched', event.data.name);
	}
});
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
yarn build            # build this project
yarn dev              # run compilers in watch mode, both for babel and typescript
yarn test             # run the unit tests incl coverage
yarn test:dev         # run the unit tests in watch mode
yarn lint             # run eslint and tslint on this project
yarn doc              # generate typedoc documentation
```

When installing this module, it adds a pre-commit hook, that runs lint and prettier commands
before committing, so you can be sure that everything checks out.

## Contribute

View [CONTRIBUTING.md](./CONTRIBUTING.md)


## Changelog

View [CHANGELOG.md](./CHANGELOG.md)


## Authors

View [AUTHORS.md](./AUTHORS.md)


## LICENSE

[MIT](./LICENSE) © MediaMonks



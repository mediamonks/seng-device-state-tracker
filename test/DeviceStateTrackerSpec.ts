import DeviceStateTracker from '../src/lib/DeviceStateTracker';
import DeviceStateEvent from '../src/lib/DeviceStateEvent';
// Uncomment to test with JS configMock
// import { mediaQueries, DeviceState, WrongDeviceState, maxWidthMediaQueries } from './configMockJs';
import { mediaQueries, DeviceState, WrongDeviceState, maxWidthMediaQueries } from './configMock';
import { expect } from 'chai';
import {} from 'mocha';
const matchMediaMock = require('match-media-mock').create();

// Use matchMediaMock instead of window.matchMedia native
window.matchMedia = <any> matchMediaMock;

/**
 * Small helper function for populating media key of QueryList object see
 * https://github.com/azazdeaz/match-media-mock/issues/2 for more details.
 * Handles JavaScript and TypeScript 'enums'
 * @param deviceState
 * @param deviceStateTracker
 */
const populateQueryListMediaKey = (deviceStateTracker) => {
	const enumValues = Object.keys(DeviceState)
		.reduce(
			(accumulator:Array<string>, value) => {
				if (isNaN(parseInt(value, 10))) {
					accumulator.push(value);
				}

				return accumulator;
			},
			[]);

	(<any> deviceStateTracker).queryList.forEach((mq, index) => mq.media = mediaQueries[enumValues[index]]);
};

describe('DeviceStateTracker', () => {
	describe('#DeviceStateTracker should return the correct state for different Device States', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(
			{
				mediaQueries,
				deviceState: DeviceState,
			});

		populateQueryListMediaKey(deviceStateTracker);

		it('should match X_SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 478 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.X_SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 480 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match MEDIUM', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 768 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.MEDIUM);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match LARGE', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 1280 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.LARGE);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});
	});

	it('should return the state-indicator div', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(
			{
				mediaQueries,
				deviceState: DeviceState,
			},
			false, true);
		// Lint will throw an error if not defined (workaround)
		if (deviceStateTracker) {
			expect(document.querySelector('.seng-state-indicator')!.tagName).to.equal('DIV');
		}
	});

	it('should throw an error while calling construct with wrong enum', () => {
		expect(() => {
			new DeviceStateTracker({
				mediaQueries,
				deviceState: WrongDeviceState,
			});
		}).to.throw(
			Error,
		);
	});

	it('should throw an error when device state doesn\'t have any keys', () => {
		expect(() => {
			new DeviceStateTracker({
				mediaQueries,
				deviceState: {},
			});
		}).to.throw(
			Error,
		);
	});

	it('should throw an error when device state isn\'t found in mediaQueries', () => {
		const mediaQueriesClone = JSON.parse(JSON.stringify(mediaQueries));
		delete mediaQueriesClone['MEDIUM'];

		expect(() => {
			new DeviceStateTracker({
				mediaQueries: mediaQueriesClone,
				deviceState: DeviceState,
			});
		}).to.throw(
			Error,
		);
	});

	describe('#DeviceStateTracker should return the correct state for different Device States (reversed)', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(
			{
				mediaQueries: maxWidthMediaQueries,
				deviceState: DeviceState,
			},
			true);

		populateQueryListMediaKey(deviceStateTracker);

		it('should match X_SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 320 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.X_SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 480 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match MEDIUM', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 768 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.MEDIUM);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should also LARGE', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 1024 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.LARGE);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should also match LARGE', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 1280 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.LARGE);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});
	});


	it('should remove all mediaQueries,listeners', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(
			{
				mediaQueries,
				deviceState: DeviceState,
			});

		deviceStateTracker.destruct();
		expect((<any> deviceStateTracker).queryList.length).to.equal(0);
	});

	it('should remove all mediaQueries,listeners and stateIndicator', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(
			{
				mediaQueries,
				deviceState: DeviceState,
			},
			false,
			true);

		deviceStateTracker.destruct();
		expect((<any> deviceStateTracker).queryList.length).to.equal(0);
	});
});

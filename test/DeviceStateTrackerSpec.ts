import DeviceStateTracker from '../src/lib/DeviceStateTracker';
import DeviceStateEvent from '../src/lib/DeviceStateEvent';
import { mediaQueries, DeviceState, WrongDeviceState } from './configMock';
import { expect } from 'chai';
import {} from 'mocha';
const matchMediaMock = require('match-media-mock').create();


window.matchMedia = <any> matchMediaMock;

describe('DeviceStateTracker', () => {
	describe('#DeviceStateTracker should return the correct state for different Device States', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(mediaQueries, DeviceState);
		// https://github.com/azazdeaz/match-media-mock/issues/2
		(<any> deviceStateTracker)._queryLists.forEach((mq, index) => mq.media = mediaQueries[DeviceState[index]]);

		it('should match X_SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 479 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.X_SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker)._queryLists.forEach(mq => mq.callListeners());
		});

		it('should match SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 480 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker)._queryLists.forEach(mq => mq.callListeners());
		});

		it('should match MEDIUM', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 768 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.MEDIUM);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker)._queryLists.forEach(mq => mq.callListeners());
		});

		it('should match LARGE', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 1280 });

			const eventHandler = () => {
				expect(deviceStateTracker.currentState).to.equal(DeviceState.LARGE);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker)._queryLists.forEach(mq => mq.callListeners());
		});
	});

	it('should return the state-indicator div', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(mediaQueries, DeviceState, false, true);
		// Lint will throw an error if not defined (workaround)
		if (deviceStateTracker) {
			expect(document.querySelector('.seng-state-indicator')!.tagName).to.equal('DIV');
		}
	});

	it('should throw an error while calling construct with wrong enum', () => {
		expect(() => {
			new DeviceStateTracker(mediaQueries, WrongDeviceState);
		}).to.throw(
			Error,
		);
	});

	it('should throw an error when device state doesn\'t have any keys', () => {
		expect(() => {
			new DeviceStateTracker(mediaQueries, {});
		}).to.throw(
			Error,
		);
	});

	it('should throw an error when device state isn\'t found in mediaQueries', () => {
		const mediaQueriesClone = JSON.parse(JSON.stringify(mediaQueries));
		delete mediaQueriesClone['MEDIUM'];

		expect(() => {
			new DeviceStateTracker(mediaQueriesClone, DeviceState);
		}).to.throw(
			Error,
		);
	});

	it('should reverse the deviceState order', () => {
		// Branch coverage
		new DeviceStateTracker(mediaQueries, DeviceState, true);
	});

	it('should remove all mediaQueries and listeners', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(mediaQueries, DeviceState);

		deviceStateTracker.destruct();
		expect((<any> deviceStateTracker)._queryLists.length).to.equal(0);
	});
});

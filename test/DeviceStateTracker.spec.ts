import DeviceStateTracker from '../src/lib/DeviceStateTracker';
import DeviceStateEvent from '../src/lib/DeviceStateEvent';
// Uncomment to test with JS configMock
// import { mediaQueries, DeviceState, WrongDeviceState, maxWidthMediaQueries } from './configMockJs';
import { mediaQueries, DeviceState, WrongDeviceState, maxWidthMediaQueries } from './configMock';
import { expect } from 'chai';
import IDeviceStateConfig from '../src/lib/IDeviceStateConfig';
// Use patched version as the original `match-media-mock` isn't published with patches
const matchMediaMock = require('match-media-mock-patched').create();

// Use matchMediaMock instead of window.matchMedia native
window.matchMedia = <any> matchMediaMock;

describe('DeviceStateTracker', () => {

	describe('#DeviceStateTracker should return the correct state for different Device States', () => {
		const config:IDeviceStateConfig = {
			mediaQueries,
			deviceState: DeviceState,
		};

		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(config);

		it('should match X_SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 478 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.X_SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match X_SMALL after initialisation', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 478 });

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());

			expect(deviceStateTracker.currentDeviceState).to.deep.equal({
				state: 0,
				name: 'X_SMALL',
			});
		});

		it('should match SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 480 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match MEDIUM', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 768 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.MEDIUM);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match LARGE', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 1280 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.LARGE);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});
	});

	it('should return the state-indicator div', () => {
		const config:IDeviceStateConfig = {
			mediaQueries,
			deviceState: DeviceState,
			showStateIndicator: true,
		};

		new DeviceStateTracker(config);

		expect(document.querySelector('.seng-state-indicator')!.tagName).to.equal('DIV');
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
		const config:IDeviceStateConfig = {
			mediaQueries: maxWidthMediaQueries,
			deviceState: DeviceState,
			reverseDeviceStateOrder: true,
		};

		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(config);

		it('should match X_SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 320 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.X_SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match SMALL', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 480 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.SMALL);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should match MEDIUM', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 768 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.MEDIUM);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should also LARGE', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 1024 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.LARGE);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});

		it('should also match LARGE', () => {
			matchMediaMock.setConfig({ type: 'screen', width: 1280 });

			const eventHandler = (event:DeviceStateEvent) => {
				expect(event.data.state).to.equal(DeviceState.LARGE);
				deviceStateTracker.removeEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);
			};

			deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, eventHandler);

			(<any> deviceStateTracker).queryList.forEach(mq => mq.callListeners());
		});
	});


	it('should remove all mediaQueries,listeners', () => {
		const config:IDeviceStateConfig = {
			mediaQueries,
			deviceState: DeviceState,
		};

		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(config);

		deviceStateTracker.destruct();
		expect((<any> deviceStateTracker).queryList.length).to.equal(0);
	});

	it('should remove all mediaQueries,listeners and stateIndicator', () => {
		const config:IDeviceStateConfig = {
			mediaQueries,
			deviceState: DeviceState,
			showStateIndicator: true,
		};

		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(config);

		deviceStateTracker.destruct();
		expect((<any> deviceStateTracker).queryList.length).to.equal(0);
	});
});

import DeviceStateTracker from '../src/lib/DeviceStateTracker';
import DeviceStateEvent from '../src/lib/DeviceStateEvent';
import { mediaQueries, DeviceState } from './configMock';
import { expect } from 'chai';
import {} from 'mocha';

let deviceStateTracker:DeviceStateTracker;

describe('DeviceStateTracker', () => {
	beforeEach(() => {
		deviceStateTracker = new DeviceStateTracker(mediaQueries, DeviceState);
	});

	it('should return the correct environment', () => {
		deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, () => {
			expect(deviceStateTracker.currentState).to.equal(DeviceState.X_SMALL);
		});
	});
});

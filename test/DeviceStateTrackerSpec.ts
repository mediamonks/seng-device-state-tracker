import DeviceStateTracker from '../src/lib/DeviceStateTracker';
import DeviceStateEvent from '../src/lib/DeviceStateEvent';
import { mediaQueries, DeviceState } from './configMock';
import { expect } from 'chai';
import {} from 'mocha';

const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(mediaQueries, DeviceState);

describe('DeviceStateTracker', () => {
	it('should return the correct state for X_SMALL', () => {
		deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, () => {
			expect(deviceStateTracker.currentState).to.equal(DeviceState.X_SMALL);
		});
	});
});

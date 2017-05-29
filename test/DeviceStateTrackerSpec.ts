import DeviceStateTracker from '../src/lib/DeviceStateTracker';
import DeviceStateEvent from '../src/lib/DeviceStateEvent';
import { mediaQueries, DeviceState, WrongDeviceState } from './configMock';
import { expect } from 'chai';
import {} from 'mocha';

describe('DeviceStateTracker', () => {
	it('should return the correct state for X_SMALL', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(mediaQueries, DeviceState);

		deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, () => {
			expect(deviceStateTracker.currentState).to.equal(DeviceState.X_SMALL);
		});
	});

	it('should return the state-indicator div', () => {
		const deviceStateTracker:DeviceStateTracker = new DeviceStateTracker(mediaQueries, DeviceState, false, true);
		// Lint will throw an error if not defined (workaround)
		if (deviceStateTracker) {
			const stateIndicator = document.querySelector('.seng-state-indicator').tagName;
			expect(stateIndicator).to.equal('DIV');
		}
	});
});

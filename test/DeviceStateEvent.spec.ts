import DeviceStateEvent from '../src/lib/DeviceStateEvent';
import { expect } from 'chai';

describe('#DeviceStateEvent', () => {
	it('should clone itself', () => {
		const deviceStateEvent = new DeviceStateEvent(DeviceStateEvent.STATE_UPDATE, {
			state: 0,
			name: 'X_SMALL',
		});

		expect(deviceStateEvent.clone()).to.deep.equal(deviceStateEvent);
	});
});

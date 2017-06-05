import DeviceStateEvent from '../src/lib/DeviceStateEvent';
import { expect } from 'chai';
import {} from 'mocha';

describe('#DeviceStateEvent', () => {
	it('should clone itself', () => {
		const deviceStateEvent = new DeviceStateEvent(DeviceStateEvent.STATE_UPDATE);

		expect(deviceStateEvent.clone()).to.deep.equal(deviceStateEvent);
	});
});

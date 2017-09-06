import DeviceStateEvent from '../src/lib/DeviceStateEvent';
import { expect } from 'chai';
import {} from 'mocha';
import DataEvent from '../src/lib/DataEvent';

describe('#DataEvent', () => {
	it('should clone itself', () => {
		const dataEvent = new DataEvent(DeviceStateEvent.STATE_UPDATE, {});

		expect(dataEvent.clone()).to.deep.equal(dataEvent);
	});
});

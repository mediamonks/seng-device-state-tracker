import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';
import DataEvent from './DataEvent';
import IDeviceStateData from './IDeviceStateData';

class DeviceStateEvent extends DataEvent<IDeviceStateData> {
	public static STATE_UPDATE:string = EVENT_TYPE_PLACEHOLDER;
	public data:IDeviceStateData;

	public clone():DeviceStateEvent {
		return new DeviceStateEvent(this.type, this.data, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ DeviceStateEvent });

export default DeviceStateEvent;

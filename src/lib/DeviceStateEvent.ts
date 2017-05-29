import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';

class DeviceStateEvent extends AbstractEvent {
	public static STATE_UPDATE:string = EVENT_TYPE_PLACEHOLDER;

	public clone():DeviceStateEvent {
		return new DeviceStateEvent(this.type, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ DeviceStateEvent });

export default DeviceStateEvent;

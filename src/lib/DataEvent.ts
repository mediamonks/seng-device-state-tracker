import AbstractEvent from 'seng-event/lib/AbstractEvent';

class DataEvent<T> extends AbstractEvent {
  public data: T;

  /**
   * Creates a DataEvent object to pass as a parameter to event listeners.
   * @param type The type of event.
   * @param data The data send with the event
   * @param bubbles If true, the event will also go through a bubbling phase. See [[EventDispatcher.dispatchEvent]]
   * for more information on the event phases.
   * @param  (default = false) — Determines whether the Event object participates in the bubbling stage of the event
   * flow. The default value is false.
   * @param cancelable Determines whether the Event object can be canceled. The default values is false.
   */
  constructor(type: string, data: T, bubbles: boolean = false, cancelable: boolean = false) {
    super(type, bubbles, cancelable);
    this.data = data;
  }

  /**
   * Duplicates an instance of an Event subclass.
   */
  public clone(): DataEvent<T> {
    return new DataEvent<T>(this.type, this.data, this.bubbles, this.cancelable);
  }
}

export default DataEvent;

import EventDispatcher from 'seng-event/lib/EventDispatcher';
import DeviceStateEvent from './DeviceStateEvent';
import IDeviceStateConfig, { IMediaQuery, IDeviceState } from './IDeviceStateConfig';

/**
 * Utility class that tracks which media query is currently active using the
 * matchMedia API.
 */
export default class DeviceStateTracker extends EventDispatcher {
	/**
	 * currentState holds the index of the currently active DeviceState.
	 */
	public currentState:number;
	/**
	 * currentStateName holds the name of the currently active state.
	 */
	public currentStateName:string;
	/**
	 * Array of MediaQueryList instances for each device state.
	 */
	private queryList:Array<MediaQueryList> = [];
	/**
	 * Array containing the name of each device state.
	 */
	private deviceStateNames:Array<string> = [];
	/**
	 * Array containing a boolean for each device state that indicates if the
	 * media query currently matches. When multiple media queries match, we will
	 * set the state to the one with the largest index.
	 */
	private queryListMatches:Array<boolean> = [];
	/**
	 * Reference to a state-indicator element.
	 */
	private stateIndicator:HTMLDivElement;

	/**
	 * This object holds a list of available mediaQueries.
	 */
	private mediaQueries:IMediaQuery;

	/**
	 * This enum is used by the to determine which of the media queries in
	 * the mediaQueries object above are considered 'device states'. Names of this enum have to
	 * correspond with one of the keys in the mediaQueries object. When using the DeviceStateTracker,
	 * make sure you have enough device states so that there will always be one with a matching media query.
	 *
	 * At any time only one "device state" will be active. This will be the last name below that has a
	 * matching breakpoint. This is usually convenient for mobile-first designs. If you want to reverse
	 * this order (for desktop-first designs, for example). Pass the reverseDeviceStateOrder boolean as true.
	 */
	private deviceState:IDeviceState;

	/**
	 * Local private variable to store the device state order.
	 */
	private reverseDeviceStateOrder:boolean;

	/**
	 *
	 * @param deviceStateConfig An object with media queries and device states
	 * @param reverseDeviceStateOrder When targeting desktop first (max-width) media queries set the
	 * reverseDeviceStateOrder boolean to true (default false)
	 * @param showStateIndicator appends a div with the current state name
	 */
	constructor(
		deviceStateConfig:IDeviceStateConfig,
		reverseDeviceStateOrder:boolean = false,
		showStateIndicator:boolean = false,
	) {
		super();

		this.enumCheck(deviceStateConfig.deviceState);

		this.deviceState = deviceStateConfig.deviceState;
		this.mediaQueries = deviceStateConfig.mediaQueries;
		this.reverseDeviceStateOrder = reverseDeviceStateOrder;
		this.handleQueryChange = this.handleQueryChange.bind(this);
		this.initTracking();

		if (showStateIndicator) {
			this.initStateIndicator();
		}
	}

	/**
	 * Checks if the enum object is correctly formatted. The DeviceState enum should only contain numeric values in
	 * an ascending order.
	 * @param deviceState
	 */
	private enumCheck(deviceState:IDeviceState):void {
		// Get all the keys of deviceState object
		const enumValues = Object.keys(deviceState).map(k => deviceState[k]);
		// Get all the numeric values from enumValues
		const enumKeys = enumValues.filter(value => typeof value === 'number') as Array<number>;

		// Check if we actually have enum values
		if (enumKeys.length === 0) {
			throw new Error(`[DeviceStateTracker] DeviceState object should contain valid enum values`);
		}

		// Check if enum keys are in an ascending order
		enumKeys.forEach((key:number, index) => {
			// Check order
			if (key !== index) {
				throw new Error(`[DeviceStateTracker] DeviceState ${deviceState[key]}: ${key} is not following an ascending order`);
			}
		});
	}

	/**
	 * Initializes tracking of media queries using matchMedia.
	 */
	private initTracking():void {
		this.deviceStateNames = Object.keys(this.deviceState).filter(key => isNaN(parseInt(key, 10)));
		this.initMatchMedia();
	}

	/**
	 * Loops through each deviceState and adds a matchMedia listener for each.
	 * Calls updateFromMatchMedia to initialize the current state.
	 */
	private initMatchMedia():void {
		this.queryList = this.deviceStateNames.map<MediaQueryList>((stateName) => {
			const mediaQuery:string = this.mediaQueries[stateName];
			if (!mediaQuery) {
				throw new Error(`[DeviceStateTracker] DeviceState ${stateName} not found in the mediaQueries array.`);
			}
			return window.matchMedia(mediaQuery);
		});

		this.queryList.forEach((mql:MediaQueryList) => {
			this.queryListMatches.push(mql.matches);
			mql.addListener(this.handleQueryChange);
		});

		this.updateFromMatchMedia();
	}

	/**
	 * Called whenever a MediaQueryList updates. Checks if the query matches
	 * and stores the result in the queryListMatches array. Then calls
	 * updateFromMatchMedia() to find the current state from all matching
	 * queries.
	 * @param changedMql The MediaQueryList that changed
	 */
	private handleQueryChange(changedMql:MediaQueryList):void {
		this.queryList.forEach((mql:MediaQueryList, index:number) => {
			if (mql.media === changedMql.media) {
				this.queryListMatches[index] = changedMql.matches;
			}
		});

		this.updateFromMatchMedia();
	}

	/**
	 * Takes the results from the matchMedia event listeners saved in the
	 * queryListMatches property. Sets the last one in the array as the active
	 * query. When the reverseDeviceStateOrder boolean is set to true, will
	 * set the first one in this array.
	 */
	private updateFromMatchMedia():void {
		const numQueries = this.queryListMatches.length;

		for (let i = 0; i < numQueries; i += 1) {
			const index = this.reverseDeviceStateOrder ? i : numQueries - 1 - i;

			if (this.queryListMatches[index]) {
				// Update current state
				this.currentState = index;
				// Update current state name
				this.currentStateName = this.deviceStateNames[index];
				// Update stateIndicator if available
				if (this.stateIndicator) {
					this.stateIndicator.textContent = this.currentStateName;
				}
				// Dispatch a new DeviceStateEvent
				this.dispatchEvent(new DeviceStateEvent(DeviceStateEvent.STATE_UPDATE, false));
				break;
			}
		}
	}

	/**
	 * Initializes tracking of the current media query using a state indicator
	 * element. This element will hold the state name as content inside its
	 * :before pseudo-element.
	 */
	private initStateIndicator():void {
		this.stateIndicator = document.createElement('div');
		this.stateIndicator.className = 'seng-state-indicator';
		document.body.appendChild(this.stateIndicator);
	}

	/**
	 * Destruct this DeviceStateTracker instance and remove any event listeners.
	 */
	public destruct():void {
		this.queryList.forEach((query:MediaQueryList) => {
			query.removeListener(this.handleQueryChange);
		});

		if (this.stateIndicator) {
			document.body.removeChild(this.stateIndicator);
		}

		this.queryList.length = 0;
	}
}

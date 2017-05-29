import { DeviceState, mediaQueries, reverseDeviceStateOrder } from 'app/data/scss-shared/MediaQueries';
import EventDispatcher from 'seng-event/lib/EventDispatcher';

/**
 * Util class that tracks which media query is currently active using the
 * matchMedia API if available. If not available, it will use a state indicator
 * that updates using CSS.
 * The breakpoints are provided in a separate MediaQueries.js file, which is
 * shared with SCSS to generate the corresponding CSS.
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
	private _queryLists:Array<MediaQueryList> = [];
	/**
	 * Array containing the name of each device state.
	 */
	private _deviceStateNames:Array<string> = [];
	/**
	 * Array containing a boolean for each device state that indicates if the
	 * media query currently matches. When multiple media queries match, we will
	 * set the state to the one with the largest index.
	 */
	private _queryListMatches:Array<boolean> = [];
	/**
	 * Reference to a state-indicator element.
	 */
	private _stateIndicator:HTMLDivElement;

	constructor() {
		super();

		this.handleQueryChange = this.handleQueryChange.bind(this);
		this.initTracking();
	}

	/**
	 * Initializes tracking of media queries using matchMedia.
	 */
	private initTracking():void {
		this._deviceStateNames = Object.keys(DeviceState).filter((key) => {
			return isNaN(parseInt(key, 10));
		});

		this.initMatchMedia();
		this.initStateIndicator();
	}

	/**
	 * Loops through each deviceState and adds a matchMedia listener for each.
	 * Calls updateFromMatchMedia_ to initialize the current state.
	 */
	private initMatchMedia():void {
		this._queryLists = this._deviceStateNames.map<MediaQueryList>((stateName) => {
			const mediaQuery:string = mediaQueries[stateName];
			if (!mediaQuery) {
				throw new Error(`DeviceState ${stateName} not found in the mediaQueries array.`);
			}
			return window.matchMedia(mediaQuery);
		});

		this._queryLists.forEach((mql:MediaQueryList) => {
			this._queryListMatches.push(mql.matches);
			mql.addListener(this.handleQueryChange);
		});

		this.updateFromMatchMedia();
	}

	/**
	 * Called whenever a MediaQueryList updates. Checks if the query matches
	 * and stores the result in the queryListMatches_ array. Then calls
	 * updateFromMatchMedia_() to find the current state from all matching
	 * queries.
	 * @param changedMql The MediaQueryList that changed
	 */
	private handleQueryChange(changedMql:MediaQueryList):void {
		this._queryLists.forEach((mql:MediaQueryList, index:number) => {
			if (mql.media === changedMql.media) {
				this._queryListMatches[index] = changedMql.matches;
			}
		});

		this.updateFromMatchMedia();
	}

	/**
	 * Takes the results from the matchMedia event listeners saved in the
	 * queryListMatches_ property. Sets the last one in the array as the active
	 * query. When the reverseDeviceStateOrder boolean is set to true, will
	 * set the first one in this array.
	 */
	private updateFromMatchMedia():void {
		const numQueries = this._queryListMatches.length;

		for (let i = 0; i < numQueries; i += 1) {
			const index = reverseDeviceStateOrder ? i : numQueries - 1 - i;

			if (this._queryListMatches[index]) {
				this.currentState = index;
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
		this._stateIndicator = document.createElement('div');
		this._stateIndicator.className = 'state-indicator';
		document.body.appendChild(this._stateIndicator);
	}

	/**
	 * Destruct this DeviceStateTracker instance and remove any event listeners.
	 */
	public destruct():void {
		this._queryLists.forEach((query:MediaQueryList) => {
			query.removeListener(this.handleQueryChange);
		});

		this._queryLists.length = 0;
	}
}

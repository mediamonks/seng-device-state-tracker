interface IDeviceStateConfig {
	mediaQueries:IMediaQuery;
	deviceState:IDeviceState;
	reverseDeviceStateOrder?:boolean;
	showStateIndicator?:boolean;
}

export interface IMediaQuery {
	[breakPoint:string]:string;
}

export interface IDeviceState {
	[state:string]:any;
}

export default IDeviceStateConfig;

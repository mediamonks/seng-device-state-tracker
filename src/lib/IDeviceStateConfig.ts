interface IDeviceStateConfig {
	mediaQueries:IMediaQuery;
	deviceState:IDeviceState;
}

export interface IMediaQuery {
	[breakPoint:string]:string;
}

export interface IDeviceState {
	[state:string]:any;
}

export default IDeviceStateConfig;

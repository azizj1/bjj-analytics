declare const __DEV__: boolean;

declare module '*.scss' {
	const styles: any;
	export = styles;
}

declare module '*.svg' {
	const url: any;
	export = url;
}

declare module '*.png' {
	const url: any;
	export = url;
}

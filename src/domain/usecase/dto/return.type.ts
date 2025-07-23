import { ERetCode, TSuccess } from "../../common/error-code.enum";

export type TReturn<T> = {
	readonly code: ERetCode | TSuccess;
	readonly message: string;
	readonly data?: T;
};

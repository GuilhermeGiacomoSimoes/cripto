import { TFunction } from "./user.dto";

export type UserUpdateDTO = {
	id: string;
	name?: string;
	email?: string;
	password?: string;
	function?: TFunction;
};

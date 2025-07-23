export type TFunction = "admin" | "client";

export type UserDTO = {
	name: string;
	email: string;
	password: string;
	function: TFunction;
};

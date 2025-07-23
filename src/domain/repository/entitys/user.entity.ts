import { TFunction } from "../../usecase/dto/user.dto";

export type UserEntity = {
	id: string;
	name: string;
	email: string;
	password: string;
	function: TFunction;
};

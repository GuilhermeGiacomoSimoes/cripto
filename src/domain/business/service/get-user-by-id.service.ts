import { IRepository } from "../../adapters/repository.interface";
import { UserEntity } from "../../repository/entitys/user.entity";
import { ERetCode } from "../../common/error-code.enum";
import { TReturn } from "../../usecase/dto/return.type";
import { errorDescription } from "./error-description.service";

export async function getUserByIDService(
	id: string,
	repository: IRepository
): Promise<TReturn<UserEntity>> {
	if (!id) {
		return {
			code: ERetCode.BUG,
			message: errorDescription(ERetCode.BUG),
		};
	}

	const user = await repository.getUserById(id);
	if (!user) {
		return {
			code: ERetCode.USER_NOT_EXISTS,
			message: errorDescription(ERetCode.USER_NOT_EXISTS),
		};
	}

	return {
		code: ERetCode.SUCCESS,
		message: errorDescription(ERetCode.SUCCESS),
		data: user,
	};
}

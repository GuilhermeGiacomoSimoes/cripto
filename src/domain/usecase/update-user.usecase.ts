import { IRepository } from "../adapters/repository.interface";
import { UserEntity } from "../repository/entitys/user.entity";
import { errorDescription } from "../business/service/error-description.service";
import { getUserByIDService } from "../business/service/get-user-by-id.service";
import { updateUserService } from "../business/service/update-user.service";
import { validateUserUpdate } from "../business/service/validate-user-update.service";
import { ERetCode } from "../common/error-code.enum";
import { TReturn } from "./dto/return.type";
import { UserUpdateDTO } from "./dto/update-user.dto";

export class UpdateUserUseCase {
	constructor(readonly repository: IRepository) {}

	async execute(userDTO: UserUpdateDTO): Promise<TReturn<UserEntity>> {
		let err = validateUserUpdate(userDTO);
		if (err) {
			return {
				code: err,
				message: errorDescription(err),
			};
		}

		const user = await getUserByIDService(userDTO.id, this.repository);
		if (user.code || !user.data) {
			return user;
		}

		err = await updateUserService(user.data, userDTO, this.repository);
		if (err) {
			return {
				code: err,
				message: errorDescription(err),
			};
		}

		return {
			code: ERetCode.SUCCESS,
			message: errorDescription(ERetCode.SUCCESS),
			data: user.data,
		};
	}
}

import { IRepository } from "../../adapters/repository.interface";
import { UserEntity } from "../../repository/entitys/user.entity";
import { ERetCode } from "../../common/error-code.enum";
import { UserUpdateDTO } from "../../usecase/dto/update-user.dto";
import { TFunction } from "../../usecase/dto/user.dto";

export async function updateUserService(
	user: UserEntity,
	dataUpdate: UserUpdateDTO,
	repository: IRepository
): Promise<ERetCode> {
	const keys = (Object.keys(dataUpdate) as Array<keyof UserUpdateDTO>).filter(
		(key) => key != "id"
	);
	if (keys.length < 1) {
		return ERetCode.BUG;
	}

	for (let key of keys) {
		if (dataUpdate[key]) {
			if (key == "function") {
				user[key] = dataUpdate[key] as TFunction;
			} else {
				user[key] = dataUpdate[key];
			}
		}
	}

	await repository.updateUser(user);

	return Promise.resolve(ERetCode.SUCCESS);
}

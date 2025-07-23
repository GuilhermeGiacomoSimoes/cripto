import { ERetCode } from "../../common/error-code.enum";
import { UserUpdateDTO } from "../../usecase/dto/update-user.dto";

export function validateUserUpdate(user: UserUpdateDTO): ERetCode {
	if (!user.email && !user.function && !user.name && !user.password) {
		return ERetCode.USER_NOT_UPDATED;
	}

	return ERetCode.SUCCESS;
}

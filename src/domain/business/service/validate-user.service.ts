import { ERetCode } from "../../common/error-code.enum";
import { UserDTO } from "../../usecase/dto/user.dto";

export function validateUserService(user: UserDTO): ERetCode {
	if (!user.function || !user.password || !user.name || !user.email) {
		return ERetCode.USER_INCOMPLETE;
	}

	if (!["admin", "client"].includes(user.function)) {
		return ERetCode.INVALID_TYPE;
	}

	return ERetCode.SUCCESS;
}

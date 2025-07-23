import { IRepository } from "../../adapters/repository.interface";
import { ERetCode } from "../../common/error-code.enum";

export async function checkExistEmail(
	email: string,
	rep: IRepository
): Promise<ERetCode> {
	if (!email) {
		return Promise.resolve(ERetCode.BUG);
	}

	const getEmail = await rep.getUserByEmail(email);
	if (getEmail) {
		return ERetCode.EMAIL_ALREADY_CREATED;
	}

	return ERetCode.SUCCESS;
}

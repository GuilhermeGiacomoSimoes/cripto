import { randomUUID } from "crypto";
import { IRepository } from "../adapters/repository.interface";
import { UserEntity } from "../repository/entitys/user.entity";
import { errorDescription } from "../business/service/error-description.service";
import { validateUserService } from "../business/service/validate-user.service";
import { ERetCode } from "../common/error-code.enum";
import { TReturn } from "./dto/return.type";
import { UserDTO } from "./dto/user.dto";
import { checkExistEmail } from "../business/service/check-exist-email.service";

export class CreateUserUseCase {
	constructor(readonly repository: IRepository) {}

	async create(userDTO: UserDTO): Promise<TReturn<string>> {
		let err = validateUserService(userDTO);
		if (err) {
			return this.__returnGenerator(err);
		}

		err = await checkExistEmail(userDTO.email, this.repository);
		if (err) {
			return this.__returnGenerator(err);
		}

		const user: UserEntity = {
			...userDTO,
			id: randomUUID(),
		};
		const uuid = await this.repository.createUser(user);

		return this.__returnGenerator(0, uuid);
	}

	private __returnGenerator(code: ERetCode, data?: string): TReturn<string> {
		return {
			message: errorDescription(code),
			data,
			code,
		};
	}
}

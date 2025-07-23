import { IRepository } from "../adapters/repository.interface";
import { errorDescription } from "../business/service/error-description.service";
import { ERetCode } from "../common/error-code.enum";
import { UserEntity } from "../repository/entitys/user.entity";
import { TReturn } from "./dto/return.type";

export class SearchUserUseCase {
	constructor(private readonly repository: IRepository) {}

	async execute(search: string): Promise<TReturn<UserEntity[]>> {
		const res = await this.repository.searchUser(search);
		if (res.length > 0) {
			return {
				code: ERetCode.SUCCESS,
				message: errorDescription(ERetCode.SUCCESS),
				data: res,
			};
		}

		return {
			code: ERetCode.USER_NOT_EXISTS,
			message: errorDescription(ERetCode.USER_NOT_EXISTS),
			data: [],
		};
	}
}

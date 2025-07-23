import { IRepository } from "../adapters/repository.interface";
import { getUserByIDService } from "../business/service/get-user-by-id.service";
import { UserEntity } from "../repository/entitys/user.entity";
import { TReturn } from "./dto/return.type";

export class GetUserUseCase {
	constructor(readonly repository: IRepository) {}

	async execute(id: string): Promise<TReturn<UserEntity>> {
		const ret = await getUserByIDService(id, this.repository);
		return ret;
	}
}

import { IRepository } from "../adapters/repository.interface";
import { errorDescription } from "../business/service/error-description.service";
import { ERetCode } from "../common/error-code.enum";
import { CoinEntity } from "../repository/entitys/coin.entity";
import { TReturn } from "./dto/return.type";

export class ListCoinsUseCase {
	constructor(private readonly repository: IRepository) {}

	async execute(): Promise<TReturn<CoinEntity[]>> {
		const coins = await this.repository.getAllCoins();

		return {
			code: ERetCode.SUCCESS,
			message: errorDescription(ERetCode.SUCCESS),
			data: coins,
		};
	}
}

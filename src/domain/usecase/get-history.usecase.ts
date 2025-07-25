import { error } from "console";
import { IRepository } from "../adapters/repository.interface";
import { errorDescription } from "../business/service/error-description.service";
import {
	getHistoryService,
	TRange,
} from "../business/service/get-history.service";
import { ERetCode } from "../common/error-code.enum";
import { CoinHistoryEntity } from "../repository/entitys/coin-history.entity";
import { TReturn } from "./dto/return.type";

export class GetHistoryUseCase {
	constructor(private readonly repository: IRepository) {}

	async execute(
		id: string,
		range: TRange
	): Promise<TReturn<CoinHistoryEntity[]>> {
		const coin = await this.repository.getCoin(id);
		if (!coin) {
			return {
				code: ERetCode.COIN_NOT_FOUND,
				message: errorDescription(ERetCode.COIN_NOT_FOUND),
			};
		}

		const ret = await getHistoryService(id, range, this.repository);
		const data = ret.data;

		return {
			code: ERetCode.SUCCESS,
			message: errorDescription(ERetCode.SUCCESS),
			data,
		};
	}
}

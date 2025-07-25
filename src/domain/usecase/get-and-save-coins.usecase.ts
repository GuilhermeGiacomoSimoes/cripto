import { IHttpRequestCoins } from "../adapters/http-request-coins.interface";
import { IRepository } from "../adapters/repository.interface";
import { saveCoinService, TRet } from "../business/service/save-coin.service";
import { TReturn } from "./dto/return.type";

export class GetAndSaveCoinsUseCase {
	constructor(
		private readonly repository: IRepository,
		private readonly http: IHttpRequestCoins
	) {}

	async execute(): Promise<TReturn<TRet[]>> {
		const coinsHTTP = await this.http.getCoins();
		const ret = await saveCoinService(coinsHTTP, this.repository);

		return ret;
	}
}

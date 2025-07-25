import { IHttpRequestCoins } from "../adapters/http-request-coins.interface";
import { IRepository } from "../adapters/repository.interface";
import { errorDescription } from "../business/service/error-description.service";
import { saveHistoryService } from "../business/service/save-history.service";
import { updateCoin } from "../business/service/update-coin.service";
import { ERetCode } from "../common/error-code.enum";
import { TReturn } from "./dto/return.type";

type TRetData = {
	savehistory: any[];
	updateCoin: any[];
};

export class GetAndSaveHistoryUseCase {
	constructor(
		private readonly repository: IRepository,
		private readonly http: IHttpRequestCoins
	) {}

	async execute(): Promise<TReturn<TRetData | undefined>> {
		const coins = await this.repository.getAllCoins();

		let retData: TRetData | undefined = {
			savehistory: [],
			updateCoin: [],
		};

		for (let coin of coins) {
			const historyOneDay = await this.http.getHistory(coin.id);
			if (historyOneDay) {
				const ret = await saveHistoryService(historyOneDay, this.repository);
				if (ret.code != ERetCode.SUCCESS && ret.data) {
					retData.savehistory.push(...ret.data);
				} else {
					const err = await updateCoin(historyOneDay, this.repository);
					if (err) {
						retData.updateCoin.push({
							code: err,
							message: errorDescription(err),
						});
					}
				}
			}
		}

		let errCode = ERetCode.SUCCESS;
		if (retData.savehistory.length > 0 || retData.savehistory.length > 0) {
			errCode = ERetCode.BUG;
		} else {
			retData = undefined;
		}

		return {
			code: errCode,
			message: errorDescription(errCode),
			data: retData,
		};
	}
}

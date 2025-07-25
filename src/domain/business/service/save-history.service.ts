import { TCoinHistory } from "../../adapters/http-request-coins.interface";
import { IRepository } from "../../adapters/repository.interface";
import { ERetCode } from "../../common/error-code.enum";
import { CoinHistoryEntity } from "../../repository/entitys/coin-history.entity";
import { TReturn } from "../../usecase/dto/return.type";
import { errorDescription } from "./error-description.service";

type TRet = {
	time: string;
	code: ERetCode;
	message: string;
};

export async function saveHistoryService(
	history: TCoinHistory,
	repository: IRepository
): Promise<TReturn<TRet[]>> {
	const coinExist = await repository.getCoin(history.id);
	if (!coinExist) {
		return {
			code: ERetCode.COIN_NOT_FOUND,
			message: errorDescription(ERetCode.COIN_NOT_FOUND),
		};
	}

	const historyAlreadySavedArr: TRet[] = [];

	for (let price of history.prices) {
		const historyAlreadySaved = await repository.getHistoryByIdTime(
			history.id,
			price.time
		);

		if (historyAlreadySaved) {
			historyAlreadySavedArr.push({
				time: price.time,
				code: ERetCode.HISTORY_ALREADY_SAVED,
				message: errorDescription(ERetCode.HISTORY_ALREADY_SAVED),
			});

			continue;
		}

		const h: CoinHistoryEntity = {
			coindiD: history.id,
			value: price.value,
			timestamp: price.time,
		};

		await repository.saveHistory(h);
	}

	let code = ERetCode.SUCCESS;
	let data = undefined;
	if (historyAlreadySavedArr.length > 0) {
		code = ERetCode.HISTORY_ALREADY_SAVED;
		data = historyAlreadySavedArr;
	}

	return {
		code,
		data,
		message: errorDescription(code),
	};
}

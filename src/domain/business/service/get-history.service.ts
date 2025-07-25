import { IRepository } from "../../adapters/repository.interface";
import { ERetCode } from "../../common/error-code.enum";
import { CoinHistoryEntity } from "../../repository/entitys/coin-history.entity";
import { CoinEntity } from "../../repository/entitys/coin.entity";
import { TReturn } from "../../usecase/dto/return.type";
import { errorDescription } from "./error-description.service";

const ONE_DAY_TIMESTAMP = 86400;
const SEVEN_DAYS_TIMESTAMP = 604800;

export type TRange = "24h" | "7d";

export async function getHistoryService(
	id: string,
	range: TRange,
	rep: IRepository
): Promise<TReturn<CoinHistoryEntity[]>> {
	const timestamp = {
		"24h": Math.round(Date.now() / 1000) - ONE_DAY_TIMESTAMP,
		"7d": Math.round(Date.now() / 1000) - SEVEN_DAYS_TIMESTAMP,
	}[range].toString();

	const historys: CoinHistoryEntity[] = await rep.getCoinByTime(id, timestamp);

	return {
		code: ERetCode.SUCCESS,
		message: "SUCCESS",
		data: historys,
	};
}

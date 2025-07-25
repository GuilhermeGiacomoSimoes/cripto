import { TCoin } from "../../adapters/http-request-coins.interface";
import { IRepository } from "../../adapters/repository.interface";
import { ERetCode } from "../../common/error-code.enum";
import { CoinEntity } from "../../repository/entitys/coin.entity";
import { TReturn } from "../../usecase/dto/return.type";
import { errorDescription } from "./error-description.service";

export type TRet = {
	code: ERetCode;
	id: string;
};

export async function saveCoinService(
	coins: TCoin[],
	repoository: IRepository
): Promise<TReturn<TRet[]>> {
	const ret: TRet[] = [];
	const alreadyIncluded = [];

	for (let coin of coins) {
		const coinAlreadyIncluded = await repoository.getCoin(coin.id);
		if (coinAlreadyIncluded) {
			ret.push({
				code: ERetCode.COIN_ALREADY_INCLUDED,
				id: coin.id,
			});

			alreadyIncluded.push(coin.id);
			continue;
		}

		const coinEntity: CoinEntity = coin;
		await repoository.saveCoins(coinEntity);

		ret.push({
			code: ERetCode.SUCCESS,
			id: coin.id,
		});
	}

	let codeRet = ERetCode.SUCCESS;
	if (alreadyIncluded.length > 0) {
		codeRet = ERetCode.PARTIAL_ERROR;
		if (alreadyIncluded.length == coins.length) {
			codeRet = ERetCode.COIN_ALREADY_INCLUDED;
		}
	}

	return {
		code: codeRet,
		message: errorDescription(codeRet),
		data: ret,
	};
}

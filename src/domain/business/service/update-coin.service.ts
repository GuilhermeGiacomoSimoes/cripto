import { TCoinHistory } from "../../adapters/http-request-coins.interface";
import { IRepository } from "../../adapters/repository.interface";
import { ERetCode } from "../../common/error-code.enum";

export async function updateCoin(
	history: TCoinHistory,
	repository: IRepository
): Promise<ERetCode> {
	if (!history) {
		return ERetCode.BUG;
	}

	if (
		!history.prices ||
		history.prices.length < 1 ||
		!history.market_caps ||
		history.market_caps.length < 1
	) {
		return ERetCode.EMPTY_HISTORY;
	}

	const coin = await repository.getCoin(history.id);
	if (!coin) {
		return ERetCode.BUG;
	}

	history.prices.sort((a, b) => a.value - b.value);

	const biggerValueHistory = history.prices[history.prices.length - 1].value;
	const lowestValueHistory = history.prices[0].value;

	history.prices.sort((a, b) => Number(b.time) - Number(a.time));

	const currentValueHistory = history.prices[0].value;

	history.market_caps.sort((a, b) => Number(b.time) - Number(a.time));
	const marketCapHistory = history.market_caps[0].value;

	coin.marketcap = marketCapHistory;
	coin.currentValue = currentValueHistory;

	if (!coin.biggerValue || coin.biggerValue < biggerValueHistory) {
		coin.biggerValue = biggerValueHistory;
	}

	if (!coin.lowestValue || coin.lowestValue > lowestValueHistory) {
		coin.lowestValue = lowestValueHistory;
	}

	await repository.updateCoin(coin);

	return ERetCode.SUCCESS;
}

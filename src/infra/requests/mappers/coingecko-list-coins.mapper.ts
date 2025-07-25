import { TCoinHistory } from "../../../domain/adapters/http-request-coins.interface";
import { THistoryCoinGecko } from "../coingecko.request";

export function coinGeckoToDomain(
	httpRes: THistoryCoinGecko,
	id: string
): TCoinHistory {
	const pricesHttp = httpRes.prices;
	const marketCapsHttp = httpRes.market_caps;

	const prices = [];
	const market_caps = [];

	for (let price of pricesHttp) {
		prices.push({
			time: price[0],
			value: price[1],
		});
	}

	for (let marketCap of marketCapsHttp) {
		market_caps.push({
			time: marketCap[0],
			value: Number(marketCap[1].toFixed(2)),
		});
	}

	return {
		id,
		image: "",
		prices,
		market_caps,
	};
}

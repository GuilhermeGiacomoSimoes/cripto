import {
	IHttpRequestCoins,
	TCoin,
	TCoinHistory,
} from "../http-request-coins.interface";

export class HttpRequestCoinsInMemory implements IHttpRequestCoins {
	private readonly _coins: TCoin[] = [
		{
			id: "000-capital",
			name: "000 Capital",
		},
		{
			id: "0chain",
			name: "Zus",
		},
	];

	private readonly _history: TCoinHistory[] = [
		{
			id: "000-capital",
			image:
				"https://coin-images.coingecko.com/coins/images/55468/thumb/000_000.png?1746206612",
			prices: [
				{
					time: "1704067241331",
					value: 42261.0406175669,
				},
				{
					time: "1704067241332",
					value: 50000,
				},
			],
			market_caps: [
				{
					time: "1704067241331",
					value: 42261.0406175669,
				},
			],
		},
		{
			id: "0chain",
			image:
				"https://coin-images.coingecko.com/coins/images/4934/small/200x200_transparent.png?1696505474",
			prices: [
				{
					time: "1704067241331",
					value: 42261.0406175669,
				},
				{
					time: "1704067241330",
					value: 42260.0406175669,
				},
			],
			market_caps: [
				{
					time: "1704067241331",
					value: 42261.0406175669,
				},
			],
		},
	];

	async getCoins(): Promise<TCoin[]> {
		return this._coins;
	}

	async getHistory(id: string): Promise<TCoinHistory | null> {
		for (let history of this._history) {
			if (history.id == id) {
				return history;
			}
		}

		return null;
	}
}

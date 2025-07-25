import axios from "axios";
import {
	IHttpRequestCoins,
	TCoin,
	TCoinHistory,
} from "../../domain/adapters/http-request-coins.interface";
import { coinGeckoToDomain } from "./mappers/coingecko-list-coins.mapper";

export type THistoryCoinGecko = {
	prices: any[];
	market_caps: any[];
};

export class CoinGeckoHttp implements IHttpRequestCoins {
	async getCoins(): Promise<TCoin[]> {
		const response = await axios.get(
			"https://api.coingecko.com/api/v3/coins/list?include_platform=false&status=active"
		);

		return response.data;
	}

	async getHistory(id: string): Promise<TCoinHistory | null> {
		const response = await axios.get(
			`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&precision=2`
		);
		const httpRes = response.data;
		const history = coinGeckoToDomain(httpRes, id);
		return history;
	}
}

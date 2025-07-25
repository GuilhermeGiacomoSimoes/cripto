export type TCoin = {
	id: string;
	name: string;
};

type TPricesTime = {
	time: string;
	value: number;
};
export type TCoinHistory = {
	id: string;
	image: string;
	prices: TPricesTime[];
	market_caps: TPricesTime[];
};

export interface IHttpRequestCoins {
	getCoins(): Promise<TCoin[]>;
	getHistory(id: string): Promise<TCoinHistory | null>;
}

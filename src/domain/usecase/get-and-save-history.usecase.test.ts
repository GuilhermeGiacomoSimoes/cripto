import { ERetCode } from "../common/error-code.enum";
import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { HttpRequestCoinsInMemory } from "../adapters/in-memory/http-request-coins.in-memory";
import { GetAndSaveHistoryUseCase } from "./get-and-save-history.usecase";
import { CoinEntity } from "../repository/entitys/coin.entity";

describe("get and save history - usecase", () => {
	const rep = new RepositoryInMemory();
	const http = new HttpRequestCoinsInMemory();
	const uc = new GetAndSaveHistoryUseCase(rep, http);
	const coinsIDs = ["000-capital", "0chain"];

	beforeAll(async () => {
		const coins = await http.getCoins();
		for (let coin of coins) {
			await rep.saveCoins(coin);
		}
	});

	test.each(coinsIDs)("should return SUCCESS for 0000-capital", async (id) => {
		expect(await uc.execute(id)).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
		});
	});

	test("should return a coin updated", async () => {
		const coin1: CoinEntity | null = await rep.getCoin("000-capital");
		const coin2: CoinEntity | null = await rep.getCoin("0chain");

		expect(coin1).toEqual({
			id: "000-capital",
			name: "000 Capital",
			currentValue: 50000,
			biggerValue: 50000,
			lowestValue: 42261.0406175669,
			marketcap: 42261.0406175669,
		});

		expect(coin2).toEqual({
			id: "0chain",
			name: "Zus",
			currentValue: 42261.0406175669,
			biggerValue: 42261.0406175669,
			lowestValue: 42260.0406175669,
			marketcap: 42261.0406175669,
		});
	});
});

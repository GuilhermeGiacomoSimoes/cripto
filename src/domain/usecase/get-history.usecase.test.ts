import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { HttpRequestCoinsInMemory } from "../adapters/in-memory/http-request-coins.in-memory";
import { GetHistoryUseCase } from "./get-history.usecase";
import { saveCoinService } from "../business/service/save-coin.service";
import { saveHistoryService } from "../business/service/save-history.service";
import { ERetCode } from "../common/error-code.enum";
import { errorDescription } from "../business/service/error-description.service";

describe("get history - usecase", () => {
	const rep = new RepositoryInMemory();
	const http = new HttpRequestCoinsInMemory();

	const uc = new GetHistoryUseCase(rep);
	const datetime = Date.now();

	beforeAll(async () => {
		const coins = await http.getCoins();
		await saveCoinService(coins, rep);

		for (let coin of coins) {
			const history = await http.getHistory(coin.id);
			let count = 0;
			if (history) {
				for (let price of history.prices) {
					price.time = (datetime + count).toString();
					count++;
				}

				await saveHistoryService(history, rep);
			}
		}
	});

	test("should return SUCCES", async () => {
		expect(await uc.execute("0chain", "7d")).toEqual({
			code: ERetCode.SUCCESS,
			message: errorDescription(ERetCode.SUCCESS),
			data: [
				{
					coindiD: "0chain",
					value: 42261.0406175669,
					timestamp: datetime.toString(),
				},
				{
					coindiD: "0chain",
					value: 42260.0406175669,
					timestamp: (datetime + 1).toString(),
				},
			],
		});
	});

	test("should return COIN NOT FOUND", async () => {
		expect(await uc.execute("non-exists", "7d")).toEqual({
			code: ERetCode.COIN_NOT_FOUND,
			message: errorDescription(ERetCode.COIN_NOT_FOUND),
		});
	});
});

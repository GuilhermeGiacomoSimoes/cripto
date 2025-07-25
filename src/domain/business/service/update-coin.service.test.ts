import {
	TCoin,
	TCoinHistory,
} from "../../adapters/http-request-coins.interface";
import { ERetCode } from "../../common/error-code.enum";
import { RepositoryInMemory } from "../../repository/in-memory/repository.in-memory";
import { updateCoin } from "./update-coin.service";

describe("update coin - service", () => {
	const rep = new RepositoryInMemory();

	const history = {
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
			{
				time: "1704067241339",
				value: 10,
			},
		],
		market_caps: [
			{
				time: "1704067241331",
				value: 42261.0406175669,
			},
		],
	};

	const historyWithInvalidCoin = {
		id: "invalid-id",
		image:
			"https://coin-images.coingecko.com/coins/images/55468/thumb/000_000.png?1746206612",
		prices: [
			{
				time: "1704067241331",
				value: 42261.0406175669,
			},
		],
		market_caps: [
			{
				time: "1704067241331",
				value: 42261.0406175669,
			},
		],
	};

	beforeAll(async () => {
		await rep.saveCoins({
			id: "000-capital",
			name: "000 Capital",
		});
	});

	test("should return SUCCESS", async () => {
		expect(await updateCoin(history, rep)).toBe(ERetCode.SUCCESS);
	});

	test("check updated", async () => {
		const coin = await rep.getCoin("000-capital");

		expect(coin).toEqual({
			id: "000-capital",
			name: "000 Capital",
			currentValue: 10,
			biggerValue: 50000,
			lowestValue: 10,
			marketcap: 42261.0406175669,
		});
	});

	test("should return BUG if coin do not exists", async () => {
		expect(await updateCoin(historyWithInvalidCoin, rep)).toBe(ERetCode.BUG);
	});

	test("should return a BUG if history is null", async () => {
		expect(await updateCoin(null as unknown as TCoinHistory, rep)).toBe(
			ERetCode.BUG
		);
	});

	test("should return a BUG if prices or marketCaps is empty", async () => {
		expect(
			await updateCoin(
				{ id: "id", princes: [], market_caps: [] } as unknown as TCoinHistory,
				rep
			)
		).toBe(ERetCode.EMPTY_HISTORY);
	});
});

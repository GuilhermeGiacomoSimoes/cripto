import { RepositoryInMemory } from "../../repository/in-memory/repository.in-memory";
import { HttpRequestCoinsInMemory } from "../../adapters/in-memory/http-request-coins.in-memory";
import { saveCoinService } from "./save-coin.service";
import { saveHistoryService } from "./save-history.service";
import { getHistoryService } from "./get-history.service";
import { ERetCode } from "../../common/error-code.enum";

describe("get history - service", () => {
	const rep = new RepositoryInMemory();
	const timestamp_20h = (Math.round(Date.now() / 1000) - 72000).toString();
	const timestamp_5d = (Math.round(Date.now() / 1000) - 432000).toString();
	const timestamp_6d = (Math.round(Date.now() / 1000) - 518400).toString();

	beforeAll(async () => {
		const http = new HttpRequestCoinsInMemory();
		await saveCoinService(await http.getCoins(), rep);

		const gh = {
			id: "000-capital",
			image: "",
			prices: [
				{
					time: timestamp_20h,
					value: 42261.0406175669,
				},
				{
					time: timestamp_5d,
					value: 50000,
				},
				{
					time: timestamp_6d,
					value: 50001,
				},
			],
			market_caps: [
				{
					time: "1704067241331",
					value: 42261.0406175669,
				},
			],
		};

		await saveHistoryService(gh, rep);
	});

	test("should return a history for 24h", async () => {
		expect(await getHistoryService("000-capital", "24h", rep)).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
			data: [
				{
					coindiD: "000-capital",
					value: 42261.0406175669,
					timestamp: timestamp_20h,
				},
			],
		});
	});

	test("should return a history for 7d", async () => {
		expect(await getHistoryService("000-capital", "7d", rep)).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
			data: [
				{
					coindiD: "000-capital",
					value: 42261.0406175669,
					timestamp: timestamp_20h,
				},
				{
					coindiD: "000-capital",
					timestamp: timestamp_5d,
					value: 50000,
				},
				{
					coindiD: "000-capital",
					timestamp: timestamp_6d,
					value: 50001,
				},
			],
		});
	});
});

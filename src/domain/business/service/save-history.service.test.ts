import { ERetCode } from "../../common/error-code.enum";
import { RepositoryInMemory } from "../../repository/in-memory/repository.in-memory";
import { errorDescription } from "./error-description.service";
import { saveHistoryService } from "./save-history.service";

describe("save history of coins - service", () => {
	const rep = new RepositoryInMemory();
	const history = [
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
		{
			id: "dont-exists-this-coin",
			image: "",
			prices: [],
			market_caps: [],
		},
		{
			id: "0chain",
			image: "",
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
		},
	];

	beforeAll(async () => {
		await rep.saveCoins({
			id: "000-capital",
			name: "000 Capital",
		});
		await rep.saveCoins({
			id: "0chain",
			name: "Zus",
		});
	});

	test("should return SUCCESS", async () => {
		expect(await saveHistoryService(history[0], rep)).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
		});
	});

	test("should return SUCCESS", async () => {
		expect(await saveHistoryService(history[1], rep)).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
		});
	});

	test("should return that ONE of history don't have a coin saved", async () => {
		expect(await saveHistoryService(history[2], rep)).toEqual({
			code: ERetCode.COIN_NOT_FOUND,
			message: "SAVE_HISTORY.COIN_NOT_FOUND",
		});
	});

	test("should return that any prices or market_caps is already saved", async () => {
		expect(await saveHistoryService(history[3], rep)).toEqual({
			code: ERetCode.HISTORY_ALREADY_SAVED,
			message: "SAVE_HISTORY.HISTORY_ALREADY_SAVED",
			data: [
				{
					time: "1704067241331",
					code: ERetCode.HISTORY_ALREADY_SAVED,
					message: errorDescription(ERetCode.HISTORY_ALREADY_SAVED),
				},
			],
		});
	});
});

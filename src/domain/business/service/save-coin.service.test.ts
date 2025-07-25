import { TCoin } from "../../adapters/http-request-coins.interface";
import { ERetCode } from "../../common/error-code.enum";
import { RepositoryInMemory } from "../../repository/in-memory/repository.in-memory";
import { saveCoinService } from "./save-coin.service";

describe("save coin - service", () => {
	let coins: TCoin[] = [
		{
			id: "000-capital",
			name: "000 Capital",
		},
		{
			id: "0chain",
			name: "Zus",
		},
		{
			id: "2chain0",
			name: "ZusZZZZZ",
		},
	];

	let rep = new RepositoryInMemory();

	test("should return `id` with success code", async () => {
		expect(await saveCoinService([coins[0], coins[1]], rep)).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
			data: [
				{
					id: "000-capital",
					code: ERetCode.SUCCESS,
				},
				{
					id: "0chain",
					code: ERetCode.SUCCESS,
				},
			],
		});
	});

	test("should return that id `0chain` is already included", async () => {
		expect(await saveCoinService([coins[1], coins[2]], rep)).toEqual({
			code: ERetCode.PARTIAL_ERROR,
			message: "SAVE_COIN.PARTIAL_ERROR",
			data: [
				{
					id: "0chain",
					code: ERetCode.COIN_ALREADY_INCLUDED,
				},
				{
					id: "2chain0",
					code: ERetCode.SUCCESS,
				},
			],
		});
	});

	test("should return that all id is already included", async () => {
		expect(await saveCoinService([coins[1], coins[2]], rep)).toEqual({
			code: ERetCode.COIN_ALREADY_INCLUDED,
			message: "SAVE_COIN.COIN_ALREADY_INCLUDED",
			data: [
				{
					id: "0chain",
					code: ERetCode.COIN_ALREADY_INCLUDED,
				},
				{
					id: "2chain0",
					code: ERetCode.COIN_ALREADY_INCLUDED,
				},
			],
		});
	});
});

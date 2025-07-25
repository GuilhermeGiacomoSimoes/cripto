import { ERetCode } from "../common/error-code.enum";
import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { HttpRequestCoinsInMemory } from "../adapters/in-memory/http-request-coins.in-memory";
import { GetAndSaveCoinsUseCase } from "./get-and-save-coins.usecase";

describe("get and save coins - usecase", () => {
	const rep = new RepositoryInMemory();
	const http = new HttpRequestCoinsInMemory();
	const uc = new GetAndSaveCoinsUseCase(rep, http);

	test("should return SUCCESS on save", async () => {
		expect(await uc.execute()).toEqual({
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

	test("should return error on save", async () => {
		expect(await uc.execute()).toEqual({
			code: ERetCode.COIN_ALREADY_INCLUDED,
			message: "SAVE_COIN.COIN_ALREADY_INCLUDED",
			data: [
				{
					id: "000-capital",
					code: ERetCode.COIN_ALREADY_INCLUDED,
				},
				{
					id: "0chain",
					code: ERetCode.COIN_ALREADY_INCLUDED,
				},
			],
		});
	});
});

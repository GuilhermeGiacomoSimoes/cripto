import { ERetCode } from "../common/error-code.enum";
import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { ListCoinsUseCase } from "./list-coins.usecase";

describe("list coins - usecase", () => {
	const rep = new RepositoryInMemory();
	const uc = new ListCoinsUseCase(rep);

	beforeAll(async () => {
		await rep.saveCoins({
			id: "id-tes-1",
			name: "name-1",
		});
		await rep.saveCoins({
			id: "id-tes-2",
			name: "name-2",
		});
	});

	test("should list all coins", async () => {
		expect(await uc.execute()).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
			data: [
				{
					id: "id-tes-1",
					name: "name-1",
				},
				{
					id: "id-tes-2",
					name: "name-2",
				},
			],
		});
	});
});

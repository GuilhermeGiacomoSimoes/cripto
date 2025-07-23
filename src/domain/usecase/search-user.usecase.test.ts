import { SearchUserUseCase } from "./search-user.usecase";
import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { UserEntity } from "../repository/entitys/user.entity";
import { ERetCode } from "../common/error-code.enum";

describe("search user - usecase", () => {
	const rep = new RepositoryInMemory();
	const uc = new SearchUserUseCase(rep);

	const users: UserEntity[] = [
		{
			id: "id-1",
			name: "Aricleia Cafe Cha",
			function: "admin",
			password: "pass",
			email: "email@email.com",
		},
		{
			id: "id-2",
			name: "Arnold Schwarzenegger",
			function: "client",
			password: "pass",
			email: "email@email.com",
		},
		{
			id: "id-3",
			name: "Ozzy Osbourne",
			function: "admin",
			password: "pass",
			email: "email@email.com",
		},
	];
	beforeAll(async () => {
		for (let user of users) {
			await rep.createUser(user);
		}
	});

	const arrSearch = [
		{ search: "afe c", result: users[0] },
		{ search: "Arn", result: users[1] },
		{ search: "urne", result: users[2] },
	];

	test.each(arrSearch)(
		"should return a valid user for search: %name",
		async (obj) => {
			expect(await uc.execute(obj.search)).toEqual({
				code: ERetCode.SUCCESS,
				message: "SUCCESS",
				data: [obj.result],
			});
		}
	);

	test("should return a empty result", async () => {
		expect(await uc.execute("no-exist-this-name")).toEqual({
			code: ERetCode.USER_NOT_EXISTS,
			message: "GENERIC.USER_NOT_EXISTS",
			data: [],
		});
	});
});

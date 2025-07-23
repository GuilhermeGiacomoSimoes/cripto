import { GetUserUseCase } from "./get-user.usecase";
import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { UserEntity } from "../repository/entitys/user.entity";
import { ERetCode } from "../common/error-code.enum";

describe("get user - usecase", () => {
	const rep = new RepositoryInMemory();
	const uc = new GetUserUseCase(rep);
	beforeAll(() => {
		const user: UserEntity = {
			id: "id",
			name: "name",
			email: "email@email.com",
			password: "pass",
			function: "admin",
		};

		rep.createUser(user);
	});

	test("should return a valid user", async () => {
		expect(await uc.execute("id")).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
			data: {
				id: "id",
				name: "name",
				email: "email@email.com",
				password: "pass",
				function: "admin",
			},
		});
	});

	test("should return user not found", async () => {
		expect(await uc.execute("invalid-id")).toEqual({
			code: ERetCode.USER_NOT_EXISTS,
			message: "GENERIC.USER_NOT_EXISTS",
		});
	});

	test("should return a BUG", async () => {
		expect(await uc.execute(null as unknown as string)).toEqual({
			code: ERetCode.BUG,
			message: "UNKNOWN_BUG",
		});
	});
});

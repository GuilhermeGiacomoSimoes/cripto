import { UserEntity } from "../../repository/entitys/user.entity";
import { ERetCode } from "../../common/error-code.enum";
import { RepositoryInMemory } from "../../repository/in-memory/repository.in-memory";
import { getUserByIDService } from "./get-user-by-id.service";

describe("get user by id - service", () => {
	const user: UserEntity = {
		id: "id",
		name: "User1",
		email: "email@teste.com",
		function: "admin",
		password: "pass",
	};

	const rep = new RepositoryInMemory();
	let uuid: string;
	beforeAll(async () => {
		uuid = await rep.createUser(user);
	});

	test("should return a valid user", async () => {
		expect(await getUserByIDService(uuid, rep)).toEqual({
			code: ERetCode.SUCCESS,
			message: "SUCCESS",
			data: user,
		});
	});

	test("should return that client do not exists", async () => {
		expect(await getUserByIDService("invalid-id", rep)).toEqual({
			code: ERetCode.USER_NOT_EXISTS,
			message: "GENERIC.USER_NOT_EXISTS",
		});
	});

	test("should return a BUG", async () => {
		expect(await getUserByIDService(null as unknown as string, rep)).toEqual({
			code: ERetCode.BUG,
			message: "UNKNOWN_BUG",
		});
	});
});

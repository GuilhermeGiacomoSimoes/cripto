import { UserEntity } from "../../repository/entitys/user.entity";
import { ERetCode } from "../../common/error-code.enum";
import { RepositoryInMemory } from "../../repository/in-memory/repository.in-memory";
import { checkExistEmail } from "./check-exist-email.service";

describe("check if email already exist - service", () => {
	const rep = new RepositoryInMemory();
	beforeAll(async () => {
		const user: UserEntity = {
			id: "id",
			name: "nome1",
			email: "email@teste.com",
			password: "password",
			function: "admin",
		};
		await rep.createUser(user);
	});

	test("should return SUCCESS if email don't exist", async () => {
		expect(await checkExistEmail("email2@teste.com", rep)).toEqual(
			ERetCode.SUCCESS
		);
	});

	test("should return EMAIL_ALREADY_CREATED if email exist", async () => {
		expect(await checkExistEmail("email@teste.com", rep)).toEqual(
			ERetCode.EMAIL_ALREADY_CREATED
		);
	});

	test("should return a BUG if email is null", async () => {
		expect(await checkExistEmail(null as unknown as string, rep)).toEqual(
			ERetCode.BUG
		);
	});
});

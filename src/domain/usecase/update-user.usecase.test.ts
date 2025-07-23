import { UserEntity } from "../repository/entitys/user.entity";
import { ERetCode } from "../common/error-code.enum";
import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { UserDTO } from "./dto/user.dto";
import { UpdateUserUseCase } from "./update-user.usecase";

describe("update user - usecase", () => {
	let rep: RepositoryInMemory;
	let uc: UpdateUserUseCase;
	beforeAll(() => {
		rep = new RepositoryInMemory();
		uc = new UpdateUserUseCase(rep);
	});

	test("should update a valid user", async () => {
		const validUser: UserEntity = {
			id: "id",
			name: "User1",
			email: "valid-email@teste.com",
			password: "passw",
			function: "client",
		};

		const id = await rep.createUser(validUser);

		const updateUser = {
			id,
			name: "user2",
		};

		expect((await uc.execute(updateUser)).code).toBe(0);

		const getUser: UserDTO | null = await rep.getUserByEmail(validUser.email);
		if (getUser) {
			expect(getUser.name).toBe("user2");
		}
	});

	test("should return error if user not exists", async () => {
		const updateUser = {
			id: "not exist",
			name: "user2",
		};

		expect((await uc.execute(updateUser)).code).toBe(ERetCode.USER_NOT_EXISTS);
	});

	test("should return not updates", async () => {
		const updateUser = {
			id: "only-uuid",
		};

		expect((await uc.execute(updateUser)).code).toBe(ERetCode.USER_NOT_UPDATED);
	});
});

import { UserDTO } from "./dto/user.dto";
import { CreateUserUseCase } from "./create-user.usecase";
import { RepositoryInMemory } from "../repository/in-memory/repository.in-memory";
import { ERetCode } from "../common/error-code.enum";

describe("create user - usecase", () => {
	let uc: CreateUserUseCase;
	let rep: RepositoryInMemory;
	beforeAll(() => {
		rep = new RepositoryInMemory();
		uc = new CreateUserUseCase(rep);
	});

	const rightUser: UserDTO = {
		name: "User1",
		password: "pass1",
		email: "email@test.com",
		function: "admin",
	};
	test("should save the user", async () => {
		let expectedRet = {
			code: 0,
			message: "SUCCESS",
			data: "",
		};

		const receivedRet = await uc.create(rightUser);
		expectedRet.data = receivedRet.data as string;

		expect(receivedRet).toEqual(expectedRet);
	});

	const wrongUsers = [
		{
			name: null,
			password: "pass1",
			function: "admin",
			email: "email@test.com",
		},
		{
			name: "User2",
			password: null,
			function: "admin",
			email: "email@test.com",
		},
		{
			name: "User3",
			password: "pass1",
			function: null,
			email: "email@test.com",
		},
		{
			name: "User3",
			password: "pass1",
			function: "admin",
			email: null,
		},
	];
	test.each(wrongUsers)(
		`should get a error for the user %s`,
		async (wrongUser) => {
			const retWrongUser = {
				code: ERetCode.USER_INCOMPLETE,
				message: "CREATE_USER.USER_INCOMPLETE",
			};

			expect(await uc.create(wrongUser as unknown as UserDTO)).toEqual(
				retWrongUser
			);
		}
	);
});

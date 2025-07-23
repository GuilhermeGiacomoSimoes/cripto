import { ERetCode } from "../../common/error-code.enum";
import { UserDTO } from "../../usecase/dto/user.dto";
import { validateUserService } from "./validate-user.service";

describe("validate user - service", () => {
	const rightUsers = [
		{
			name: "User1",
			password: "pass1",
			function: "admin",
			email: "test@email.com",
		},
		{
			name: "User2",
			password: "pass2",
			function: "client",
			email: "test@email.com",
		},
	];

	test.each(rightUsers)("should return sucess if user %s", (user) => {
		expect(validateUserService(user as UserDTO)).toBe(0);
	});

	const incompleteUsers = [
		{
			name: null,
			password: "pass1",
			function: "admin",
			email: "test@email.com",
		},
		{
			name: "User2",
			password: null,
			function: "admin",
			email: "test@email.com",
		},
		{
			name: "User3",
			password: "pass1",
			function: null,
			email: "test@email.com",
		},
		{
			name: "User4",
			password: "pass1",
			function: "admin",
			email: null,
		},
	];

	test.each(incompleteUsers)(
		"should return 'use incomplete' if user %s",
		(user) => {
			expect(validateUserService(user as unknown as UserDTO)).toBe(
				ERetCode.USER_INCOMPLETE
			);
		}
	);

	const invalidTypes = [
		{
			name: "User5",
			password: "pass1",
			function: "admi",
			email: "test@email.com",
		},
		{
			name: "User5",
			password: "pass1",
			function: "clien",
			email: "test@email.com",
		},
	];

	test.each(invalidTypes)(
		"should return 'invalid types' if user %s",
		(user) => {
			expect(validateUserService(user as unknown as UserDTO)).toBe(
				ERetCode.INVALID_TYPE
			);
		}
	);
});

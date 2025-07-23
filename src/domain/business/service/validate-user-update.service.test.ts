import { ERetCode } from "../../common/error-code.enum";
import { validateUserUpdate } from "./validate-user-update.service";

describe("validate user update - service", () => {
	test("should return a error if only id is informed", () => {
		const invalidUser = {
			id: "only-id",
		};

		expect(validateUserUpdate(invalidUser)).toBe(ERetCode.USER_NOT_UPDATED);
	});

	test("should return a valid to update if any field if informed", () => {
		const validUser = {
			id: "only-id",
			name: "new-name",
		};

		expect(validateUserUpdate(validUser)).toBe(ERetCode.SUCCESS);
	});
});

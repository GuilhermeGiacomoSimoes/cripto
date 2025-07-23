import { ERetCode } from "../../common/error-code.enum";
import { errorDescription } from "./error-description.service";

describe("error description - service", () => {
	test("should return SUCCESS message", () => {
		expect(errorDescription(0)).toBe("SUCCESS");
	});

	test("should return 'CREATE_USER.USER_INCOMPLETE'", () => {
		expect(errorDescription(ERetCode.USER_INCOMPLETE)).toBe(
			"CREATE_USER.USER_INCOMPLETE"
		);
	});

	test("should return 'CREATE_USER.INVALID_TYPES'", () => {
		expect(errorDescription(ERetCode.INVALID_TYPE)).toBe(
			"CREATE_USER.INVALID_TYPES"
		);
	});

	test("should return 'CREATE_USER.ALREADY_CREATED'", () => {
		expect(errorDescription(ERetCode.EMAIL_ALREADY_CREATED)).toBe(
			"CREATE_USER.ALREADY_CREATED"
		);
	});

	test("should return 'UNKNOWN_BUG'", () => {
		expect(errorDescription(ERetCode.BUG)).toBe("UNKNOWN_BUG");
	});

	test("should return a 'USER_NOT_EXISTS'", () => {
		expect(errorDescription(ERetCode.USER_NOT_EXISTS)).toBe(
			"GENERIC.USER_NOT_EXISTS"
		);
	});

	test("should return a 'UPDATE_USER.USER_NOT_UPDATED'", () => {
		expect(errorDescription(ERetCode.USER_NOT_UPDATED)).toBe(
			"UPDATE_USER.USER_NOT_UPDATED"
		);
	});
});

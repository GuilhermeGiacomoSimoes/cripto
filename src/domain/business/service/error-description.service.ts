import { ERetCode } from "../../common/error-code.enum";

const description: Record<ERetCode, string> = {
	0: "SUCCESS",
	1: "CREATE_USER.USER_INCOMPLETE",
	2: "CREATE_USER.INVALID_TYPES",
	3: "CREATE_USER.ALREADY_CREATED",
	4: "UNKNOWN_BUG",
	5: "GENERIC.USER_NOT_EXISTS",
	6: "UPDATE_USER.USER_NOT_UPDATED",
	7: "GET_USER.USER_NOT_FOUND",
};

export function errorDescription(code: ERetCode): string {
	return description[code];
}

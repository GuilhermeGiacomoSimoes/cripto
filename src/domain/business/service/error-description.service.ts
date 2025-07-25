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
	8: "SAVE_COIN.PARTIAL_ERROR",
	9: "SAVE_COIN.COIN_ALREADY_INCLUDED",
	10: "SAVE_HISTORY.COIN_NOT_FOUND",
	11: "SAVE_HISTORY.HISTORY_ALREADY_SAVED",
	12: "SAVE_HISTORY.EMPTY_HISTORY",
};

export function errorDescription(code: ERetCode): string {
	return description[code];
}

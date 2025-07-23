import { ERetCode } from "../../common/error-code.enum";
import { RepositoryInMemory } from "../../repository/in-memory/repository.in-memory";
import { UserUpdateDTO } from "../../usecase/dto/update-user.dto";
import { updateUserService } from "./update-user.service";
import { UserEntity } from "../../repository/entitys/user.entity";

describe("update user - service", () => {
	let rep = new RepositoryInMemory();
	beforeAll(async () => {
		await rep.createUser({
			id: "id",
			name: "name",
			email: "email",
			function: "admin",
			password: "password",
		} as UserEntity);
	});

	test("should udpate a user", async () => {
		const userToUpdate: UserEntity = {
			id: "id",
			name: "name",
			email: "email",
			function: "admin",
			password: "password",
		};

		const dataUpdated: UserUpdateDTO = {
			id: "id",
			name: "2name2",
		};

		const ret = await updateUserService(userToUpdate, dataUpdated, rep);

		expect(ret).toBe(0);

		const consult = await rep.getUserById("id");
		if (consult) {
			expect(consult.name).toBe("2name2");
		}
	});

	test("should not udpate a user", async () => {
		const userToUpdate: UserEntity = {
			id: "id",
			name: "name",
			email: "email",
			function: "admin",
			password: "password",
		};

		const dataUpdated: UserUpdateDTO = {
			id: "id",
		};

		expect(await updateUserService(userToUpdate, dataUpdated, rep)).toBe(
			ERetCode.BUG
		);
	});
});

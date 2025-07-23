import { IRepository } from "../../adapters/repository.interface";
import { UserEntity } from "../../repository/entitys/user.entity";

export class RepositoryInMemory implements IRepository {
	_users: UserEntity[] = [];

	async getUserById(id: string): Promise<UserEntity | null> {
		for (let user of this._users) {
			if (user.id == id) {
				return user;
			}
		}

		return null;
	}

	async createUser(user: UserEntity): Promise<string> {
		this._users.push(user);
		return Promise.resolve(user.id);
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		for (let user of this._users) {
			if (user.email == email) {
				return user;
			}
		}

		return null;
	}

	async updateUser(user: UserEntity): Promise<UserEntity> {
		for (let u of this._users) {
			if (u.id == user.id) {
				u.name = user.name;
				u.email = user.email;
				u.password = user.password;
				u.function = user.function;
			}
		}

		return user;
	}
}

import { UserEntity } from "../repository/entitys/user.entity";

export interface IRepository {
	createUser(user: UserEntity): Promise<string>;
	getUserByEmail(email: string): Promise<UserEntity | null>;
	getUserById(id: string): Promise<UserEntity | null>;
	updateUser(user: UserEntity): Promise<UserEntity>;
	searchUser(search: string): Promise<UserEntity[]>;
}

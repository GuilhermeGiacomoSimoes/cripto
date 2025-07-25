import { CoinHistoryEntity } from "../repository/entitys/coin-history.entity";
import { CoinEntity } from "../repository/entitys/coin.entity";
import { UserEntity } from "../repository/entitys/user.entity";

export interface IRepository {
	createUser(user: UserEntity): Promise<string>;
	getUserByEmail(email: string): Promise<UserEntity | null>;
	getUserById(id: string): Promise<UserEntity | null>;
	updateUser(user: UserEntity): Promise<UserEntity>;
	searchUser(search: string): Promise<UserEntity[]>;
	saveCoins(coin: CoinEntity): Promise<void>;
	saveHistory(coinHistory: CoinHistoryEntity): Promise<void>;
	getCoin(id: string): Promise<CoinEntity | null>;
	getAllCoins(): Promise<CoinEntity[]>;
	getHistoryByIdTime(
		id: string,
		time: string
	): Promise<CoinHistoryEntity | null>;
	updateCoin(coin: CoinEntity): Promise<void>;
}

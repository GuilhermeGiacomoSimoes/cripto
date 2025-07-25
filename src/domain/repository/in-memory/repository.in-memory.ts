import { IRepository } from "../../adapters/repository.interface";
import { UserEntity } from "../../repository/entitys/user.entity";
import { CoinHistoryEntity } from "../entitys/coin-history.entity";
import { CoinEntity } from "../entitys/coin.entity";

export class RepositoryInMemory implements IRepository {
	private _users: UserEntity[] = [];
	private _coins: CoinEntity[] = [];
	private _coinsHistory: CoinHistoryEntity[] = [];

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

	async searchUser(search: string): Promise<UserEntity[]> {
		const res = this._users.filter((user) =>
			user.name.toLowerCase().includes(search.toLowerCase())
		);

		return res;
	}

	async saveCoins(coin: CoinEntity): Promise<void> {
		this._coins.push(coin);
	}

	async saveHistory(coinHistory: CoinHistoryEntity): Promise<void> {
		this._coinsHistory.push(coinHistory);
	}

	async getCoin(id: string): Promise<CoinEntity | null> {
		for (let coin of this._coins) {
			if (coin.id == id) {
				return coin;
			}
		}

		return null;
	}

	async getAllCoins(): Promise<CoinEntity[]> {
		return this._coins;
	}

	async getHistoryByIdTime(
		id: string,
		time: string
	): Promise<CoinHistoryEntity | null> {
		for (let history of this._coinsHistory) {
			if (history.coindiD == id && history.timestamp == time) {
				return history;
			}
		}

		return null;
	}

	async updateCoin(newCoin: CoinEntity): Promise<void> {
		for (let coin of this._coins) {
			if (coin.id == newCoin.id) {
				coin.biggerValue = newCoin.biggerValue;
				coin.currentValue = newCoin.currentValue;
				coin.lowestValue = newCoin.lowestValue;
			}
		}
	}
}

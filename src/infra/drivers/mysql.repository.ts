import { FieldPacket } from "mysql2";
import { IRepository } from "../../domain/adapters/repository.interface";
import { CoinHistoryEntity } from "../../domain/repository/entitys/coin-history.entity";
import { CoinEntity } from "../../domain/repository/entitys/coin.entity";
import { UserEntity } from "../../domain/repository/entitys/user.entity";
import db from "./database";

export class MySQLRepository implements IRepository {
	async createUser(user: UserEntity): Promise<string> {
		await db("user").insert({
			id: user.id,
			name: user.name,
			email: user.email,
			password: user.password,
			function: user.function,
		});

		return user.id;
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		const user = await db("user").where("email", email).first();
		return user;
	}

	async getUserById(id: string): Promise<UserEntity | null> {
		const user = await db("user").where("id", id).first();
		return user;
	}

	async updateUser(user: UserEntity): Promise<UserEntity> {
		await db("user").where("id", user.id).update({
			name: user.name,
			email: user.email,
			password: user.password,
			function: user.function,
		});

		return user;
	}

	async searchUser(search: string): Promise<UserEntity[]> {
		const users = await db("user").where("name", "like", `%${search}%`);
		return users;
	}

	async saveCoins(coin: CoinEntity): Promise<void> {
		await db("coins").insert({
			id: coin.id,
			name: coin.name,
		});
	}

	async saveHistory(coinHistory: CoinHistoryEntity): Promise<void> {
		await db("coin_history").insert({
			coin_id: coinHistory.coindiD,
			value: coinHistory.value,
			timestamp: coinHistory.timestamp,
		});
	}

	async getCoin(id: string): Promise<CoinEntity | null> {
		const coin = await db("coins")
			.select(
				"id",
				"name",
				"current_value as currentValue",
				"bigger_value as biggerValue",
				"lowest_value as lowestValue",
				"marketcap"
			)
			.where("id", id)
			.first();

		return coin;
	}

	async getAllCoins(): Promise<CoinEntity[]> {
		const coins = await db("coins").select(
			"id",
			"name",
			"current_value as currentValue",
			"bigger_value as biggerValue",
			"lowest_value as lowestValue",
			"marketcap"
		);

		return coins;
	}

	async getHistoryByIdTime(
		id: string,
		time: string
	): Promise<CoinHistoryEntity | null> {
		const coin = await db("coin_history")
			.select("coin_id as coinID", "value", "timestamp")
			.where({
				coin_id: id,
				timestamp: time,
			})
			.first();

		return coin;
	}

	async updateCoin(coin: CoinEntity): Promise<void> {
		await db("coins").where("id", coin.id).update({
			name: coin.name,
			current_value: coin.currentValue,
			bigger_value: coin.biggerValue,
			lowest_value: coin.lowestValue,
			marketcap: coin.marketcap,
		});
	}

	async getCoinByTime(
		coinID: string,
		time: string
	): Promise<CoinHistoryEntity[]> {
		const history = await db("coin_history")
			.where("timestamp", ">=", time)
			.andWhere("coin_id", coinID)
			.select("coin_id as coindiD", "value", "timestamp");

		return history;
	}
}

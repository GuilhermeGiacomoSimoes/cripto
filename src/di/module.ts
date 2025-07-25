import { TRange } from "../domain/business/service/get-history.service";
import { TRet } from "../domain/business/service/save-coin.service";
import { CoinHistoryEntity } from "../domain/repository/entitys/coin-history.entity";
import { CoinEntity } from "../domain/repository/entitys/coin.entity";
import { UserEntity } from "../domain/repository/entitys/user.entity";
import { CreateUserUseCase } from "../domain/usecase/create-user.usecase";
import { TReturn } from "../domain/usecase/dto/return.type";
import { UserUpdateDTO } from "../domain/usecase/dto/update-user.dto";
import { UserDTO } from "../domain/usecase/dto/user.dto";
import { GetAndSaveCoinsUseCase } from "../domain/usecase/get-and-save-coins.usecase";
import {
	GetAndSaveHistoryUseCase,
	TRetData,
} from "../domain/usecase/get-and-save-history.usecase";
import { GetHistoryUseCase } from "../domain/usecase/get-history.usecase";
import { GetUserUseCase } from "../domain/usecase/get-user.usecase";
import { ListCoinsUseCase } from "../domain/usecase/list-coins.usecase";
import { SearchUserUseCase } from "../domain/usecase/search-user.usecase";
import { UpdateUserUseCase } from "../domain/usecase/update-user.usecase";
import { MySQLRepository } from "../infra/drivers/mysql.repository";
import { CoinGeckoHttp } from "../infra/requests/coingecko.request";

export async function createUser(userDTO: UserDTO): Promise<TReturn<string>> {
	const rep = new MySQLRepository();
	const uc = new CreateUserUseCase(rep);
	return await uc.create(userDTO);
}

export async function getAndSaveCoins(): Promise<TReturn<TRet[]>> {
	const rep = new MySQLRepository();
	const http = new CoinGeckoHttp();
	const uc = new GetAndSaveCoinsUseCase(rep, http);
	return await uc.execute();
}

export async function getAndSaveHistory(
	id: string
): Promise<TReturn<TRetData | undefined>> {
	const rep = new MySQLRepository();
	const http = new CoinGeckoHttp();
	const uc = new GetAndSaveHistoryUseCase(rep, http);
	return await uc.execute(id);
}

export async function getUser(id: string): Promise<TReturn<UserEntity>> {
	const rep = new MySQLRepository();
	const uc = new GetUserUseCase(rep);
	return await uc.execute(id);
}

export async function searchUser(
	search: string
): Promise<TReturn<UserEntity[]>> {
	const rep = new MySQLRepository();
	const uc = new SearchUserUseCase(rep);
	return await uc.execute(search);
}

export async function updateUser(
	user: UserUpdateDTO
): Promise<TReturn<UserEntity>> {
	const rep = new MySQLRepository();
	const uc = new UpdateUserUseCase(rep);
	return await uc.execute(user);
}

export async function listCoins(): Promise<TReturn<CoinEntity[]>> {
	const rep = new MySQLRepository();
	const uc = new ListCoinsUseCase(rep);
	return await uc.execute();
}

export async function getHistory(
	id: string,
	range: TRange
): Promise<TReturn<CoinHistoryEntity[]>> {
	const rep = new MySQLRepository();
	const uc = new GetHistoryUseCase(rep);
	return await uc.execute(id, range);
}

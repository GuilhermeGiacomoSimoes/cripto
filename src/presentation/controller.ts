import express from "express";
import { UserDTO } from "../domain/usecase/dto/user.dto";
import {
	createUser,
	getAndSaveCoins,
	getAndSaveHistory,
	getHistory,
	getUser,
	listCoins,
	searchUser,
	updateUser,
} from "../di/module";
import { ERetCode } from "../domain/common/error-code.enum";
import { UserUpdateDTO } from "../domain/usecase/dto/update-user.dto";
import { app } from "../infra/drivers/app";
import { TRange } from "../domain/business/service/get-history.service";

app.use(express.json());

app.post("/user", async (req, res) => {
	const user: UserDTO = req.body;
	const ret = await createUser(user);
	return res.status(httpcode(ret.code)).json(ret);
});

app.get("/user/:id", async (req, res) => {
	const id: string = req.params.id;
	const ret = await getUser(id);
	return res.status(httpcode(ret.code)).json(ret);
});

app.get("/search-user/:query", async (req, res) => {
	const query: string = req.params.query;
	const ret = await searchUser(query);
	return res.status(httpcode(ret.code)).json(ret);
});

app.put("/user", async (req, res) => {
	const user: UserUpdateDTO = req.body;
	const ret = await updateUser(user);
	return res.status(httpcode(ret.code)).json(ret);
});

app.post("/get-save-coins", async (req, res) => {
	const ret = await getAndSaveCoins();
	return res.status(httpcode(ret.code)).json(ret);
});

app.post("/get-save-history/:id", async (req, res) => {
	const id: string = req.params.id;
	const ret = await getAndSaveHistory(id);
	return res.status(httpcode(ret.code)).json(ret);
});

app.get("/list-coins", async (req, res) => {
	const ret = await listCoins();
	return res.status(httpcode(ret.code)).json(ret);
});

app.get("/history", async (req, res) => {
	const coinID: string = req.query.id as string;
	const range: TRange = req.query.range as TRange;
	const ret = await getHistory(coinID, range);
	return res.status(httpcode(ret.code)).json(ret);
});

function httpcode(code: ERetCode): 200 | 400 | 500 {
	let httpcode: 200 | 400 | 500 = 200;

	if (code != ERetCode.SUCCESS) {
		httpcode = 400;

		if (code == ERetCode.BUG) {
			httpcode = 500;
		}
	}

	return httpcode;
}

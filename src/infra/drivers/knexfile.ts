import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();

const config: Knex.Config = {
	client: "mysql2",
	connection: {
		host: "localhost",
		user: "root",
		password: "rootroot",
		database: "cripto",
		port: 3306,
	},
	migrations: {
		directory: "../migrations",
		extension: "ts",
	},
	useNullAsDefault: true,
};

export default config;

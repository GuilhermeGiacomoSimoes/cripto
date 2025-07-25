import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const config: Knex.Config = {
	client: "mysql2",
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: "cripto",
		port: parseInt(process.env.DB_PORT || "3306"),
	},
	migrations: {
		directory: "../migrations",
		extension: "ts",
	},
	useNullAsDefault: true,
};

export default config;

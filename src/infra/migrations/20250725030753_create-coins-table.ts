import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("coins", (table) => {
		table.string("id").primary();
		table.string("name").notNullable();
		table.float("current_value");
		table.float("bigger_value");
		table.float("lowest_value");
		table.float("marketcap");
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("coins");
}

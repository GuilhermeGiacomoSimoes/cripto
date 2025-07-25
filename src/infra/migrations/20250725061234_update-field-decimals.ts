import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable("coins", (table) => {
		table.decimal("marketcap", 30, 2).alter();
		table.decimal("current_value", 30, 2).alter();
		table.decimal("bigger_value", 30, 2).alter();
		table.decimal("lowest_value", 30, 2).alter();
	});

	await knex.schema.alterTable("coin_history", (table) => {
		table.decimal("value", 30, 2).notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable("coins", (table) => {
		table.float("marketcap").alter();
		table.float("current_value").alter();
		table.float("bigger_value").alter();
		table.float("lowest_value").alter();
	});

	await knex.schema.alterTable("coin_history", (table) => {
		table.float("value").notNullable().alter();
	});
}

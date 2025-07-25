import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("coin_history", (table) => {
		table.string("coin_id").notNullable();
		table.float("value").notNullable();
		table.bigInteger("timestamp").notNullable();

		table
			.foreign(["coin_id"])
			.references(["id"])
			.inTable("coins")
			.onDelete("RESTRICT");

		table.primary(["coin_id", "timestamp"]);
	});
}

export async function down(knex: Knex): Promise<void> {}

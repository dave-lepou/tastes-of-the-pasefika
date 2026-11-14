/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('recipes', (table) => {
    table.integer('samoa_reactions').defaultTo(0)
    table.integer('tonga_reactions').defaultTo(0)
    table.integer('fiji_reactions').defaultTo(0)
    table.integer('rarotonga_reactions').defaultTo(0)
    table.integer('niue_reactions').defaultTo(0)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('recipes', (table) => {
    table.dropColumn('samoa_reactions')
    table.dropColumn('tonga_reactions')
    table.dropColumn('fiji_reactions')
    table.dropColumn('rarotonga_reactions')
    table.dropColumn('niue_reactions')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('country')
    table.string('category')
    table.text('ingredients')
    table.text('instructions')
    table.string('image_url')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('recipes')
}

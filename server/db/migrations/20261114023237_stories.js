/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('stories', (table) => {
    table.increments('id').primary()
    // Foreign key linking the story to a specific recipe (Parent-Child relationship)
    table
      .integer('recipe_id')
      .unsigned()
      .references('recipes.id')
      .onDelete('CASCADE') // Deletes stories automatically if the parent recipe is deleted

    table.string('name').notNullable()
    table.string('country').notNullable()
    table.text('story').notNullable()
    table.string('image_url').notNullable()

    // Reaction counters for our Pacific flag buttons
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
  return knex.schema.dropTable('stories')
}

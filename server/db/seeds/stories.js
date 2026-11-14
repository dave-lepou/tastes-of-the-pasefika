/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('stories').del()
  await knex('stories').insert([
    {
      recipe_id: 1,
      name: "Aunty Ta'a",
      country: 'Samoa',
      story:
        'Every Sunday after church, my Mum would wrap the taro and palusami in foil and layer it carefully in the umu. The smell alone would wake up the whole street. Teaching my kids how to grate the niu brings me right back to her kitchen in Lalomanu.',
      image_url: '/images/stories/samoa-sunday.jpeg',
      samoa_reactions: 12,
      tonga_reactions: 3,
      fiji_reactions: 5,
      rarotonga_reactions: 2,
      niue_reactions: 1,
    },
    {
      recipe_id: 2,
      name: 'Tevita Kavenga',
      country: 'Tonga',
      story:
        'Lu Sipi was always reserved for special family birthdays and milestones. My dad taught me how to fold the taro leaves just right so none of the coconut cream leaks out while it bakes. Sharing this with my family here in Porirua is my favorite way to represent home.',
      image_url: '/images/stories/tonga-lu.jpeg',
      samoa_reactions: 4,
      tonga_reactions: 15,
      fiji_reactions: 2,
      rarotonga_reactions: 0,
      niue_reactions: 0,
    },
  ])
}

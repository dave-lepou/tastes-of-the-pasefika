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
      image_url:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aec7eb82-1854-4ad2-8a84-26fbb9d49c13/dauqgat-12da90f6-1c46-420e-8f24-2f6a52d10753.jpg/v1/fit/w_400,h_600,q_70,strp/moana_s_mum_sina_by_singeroficeandfire_dauqgat-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6Ii9mL2FlYzdlYjgyLTE4NTQtNGFkMi04YTg0LTI2ZmJiOWQ0OWMxMy9kYXVxZ2F0LTEyZGE5MGY2LTFjNDYtNDIwZS04ZjI0LTJmNmE1MmQxMDc1My5qcGciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.0xLJA893c5wkKveHJ-qNO6kecmVmg2CuIF2Vk3ioonI',
      samoa_reactions: 12,
      tonga_reactions: 3,
      fiji_reactions: 5,
      rarotonga_reactions: 2,
      niue_reactions: 1,
    },
    {
      recipe_id: 3,
      name: 'Tevita Kavenga',
      country: 'Tonga',
      story:
        'Lu Sipi was always reserved for special family birthdays and milestones. My dad taught me how to fold the taro leaves just right so none of the coconut cream leaks out while it bakes. Sharing this with my family here in Porirua is my favorite way to represent home.',
      image_url:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/416474ba-7818-4241-8e82-32a7caded352/diize9w-d201a1c9-ac18-4d44-a3b4-1b2cb08c7fd5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi80MTY0NzRiYS03ODE4LTQyNDEtOGU4Mi0zMmE3Y2FkZWQzNTIvZGlpemU5dy1kMjAxYTFjOS1hYzE4LTRkNDQtYTNiNC0xYjJjYjA4YzdmZDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.KxU3NcV2dCUVa6SQ4ttScaDBzUN2fTcvvGjMtSrN7hs',
      samoa_reactions: 4,
      tonga_reactions: 15,
      fiji_reactions: 2,
      rarotonga_reactions: 0,
      niue_reactions: 0,
    },
  ])
}

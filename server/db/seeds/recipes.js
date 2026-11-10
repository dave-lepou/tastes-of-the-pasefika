/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()
  await knex('recipes').insert([
    {
      name: 'Koko Alaisa (Samoan Cocoa Rice)',
      country: 'Samoa',
      category: 'Breakfast / Comfort Food',
      ingredients:
        '1 cup white rice, 4 cups water, 1/2 cup Samoan cocoa blocks (or 100% dark bitter chocolate, grated), 1 cup coconut milk, 3 tbsp sugar (adjust to taste), a pinch of salt',
      instructions:
        '1. Bring water to a boil in a medium pot and add the rice. Cook until soft and water is mostly absorbed. 2. Lower the heat and stir in the grated Samoan cocoa and sugar, letting the chocolate melt completely into the rice. 3. Pour in the coconut milk and a pinch of salt, stirring continuously until creamy and thick. 4. Serve warm in bowls.',
      image_url:
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Māori Boil-up',
      country: 'Aotearoa New Zealand',
      category: 'Traditional Main',
      ingredients:
        '1kg pork bones (spare ribs or neck chops), 1 bunch puha (or watercress/silverbeet), 500g Māori potatoes (taewa) or regular potatoes, 2 large kūmera (sweet potato), 1 cup flour and 1 tsp baking powder (for doughboys)',
      instructions:
        '1. In a large pot, cover the pork bones with water, bring to a boil, and simmer for about 45 minutes to create a rich broth. 2. Peel the potatoes and kūmera, and chop them into large chunks. Add them to the pot. 3. Mix flour, baking powder, and a splash of water to form a soft dough, then drop spoonfuls (doughboys) into the boiling liquid. 4. Lay the washed puha or watercress on top, cover, and simmer for another 20 minutes until everything is tender.',
      image_url:
        'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Lu Sipi (Tongan Baked Lamb in Coconut Cream)',
      country: 'Tonga',
      category: 'Traditional Main',
      ingredients:
        "500g lamb shoulder chops (cut into pieces), 15-20 young taro leaves (or silverbeet/spinach if taro leaves aren't available), 1 large onion (sliced), 1 can (400ml) rich coconut cream, salt to taste, foil or banana leaves for wrapping",
      instructions:
        '1. Lay out clean foil or banana leaves to form a deep bowl shape. 2. Arrange the taro leaves in the center, creating a green cup. 3. Place the lamb pieces and sliced onions inside the leaves, and season with salt. 4. Pour the thick coconut cream generously over the meat. 5. Wrap the foil tightly around the mixture to seal all edges and bake in the oven at 180°C for 2 hours until the lamb is tender and melting.',
      image_url:
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Palusami',
      country: 'Samoa',
      category: 'Traditional Side / Main',
      ingredients:
        "20 young taro leaves (lu'au), 2 cans (400ml each) thick coconut cream, 1 small onion (finely diced), a pinch of salt, foil or banana leaves for wrapping",
      instructions:
        '2. Wash the taro leaves thoroughly and trim off any tough stems. 3. Mix the coconut cream with diced onions and salt in a bowl. 4. Layer the leaves together in a foil parcel, pouring a few spoonfuls of the coconut mixture between the layers. 5. Seal the parcel securely so no coconut milk leaks out, and bake at 180°C for 1.5 hours until the leaves are completely soft and rich.',
      image_url:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    },
  ])
}

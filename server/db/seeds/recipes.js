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
        'https://www.pacificislandfoodrevolution.com/images/Koko-Alaisa.png?width=800&height=800&shrink=false',
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
        'https://au-images.contentstack.com/v3/assets/blt49c8ba44aabcc4e3/blte34537d7ece75dbc/690bd7b551c68a304be48b0a/anikas-boil-up-600x400.jpg?width=360&height=360&fit=crop&format=webp&disable=upscale&dpr=1&quality=70&auto=webp',
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
        'https://i0.wp.com/pacificislandrecipe.com/wp-content/uploads/2026/04/lu-sipi-dish.webp?w=1024&ssl=1',
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
        'https://www.levasaresort.com/blog/wp-content/uploads/2018/06/paulsami-lunch-le-vasa-resort.jpg',
    },
    {
      name: 'Mainese',
      country: 'Cook Islands (Rarotonga)',
      category: 'Side / Salad',
      ingredients:
        '6 medium-large potatoes, 4 hard-boiled eggs, 1 can (450g) sliced beetroot, 1 cup frozen mixed vegetables (cooked and drained), 1/3 cup chow chow pickle, 1 cup mayonnaise, salt to taste',
      instructions:
        '1. Boil the potatoes until cooked through, let them cool, peel, and cut into small 2cm cubes. 2. In a large bowl, combine the cubed potatoes, drained mixed vegetables, diced beetroot, and chow chow pickle. 3. Grate 2 of the hard-boiled eggs directly into the bowl. 4. Add the mayonnaise and gently mix everything together until well-combined and evenly coated in a bright pink color. 5. Transfer to a serving dish, smooth the top, spread a thin layer of extra mayonnaise over it, and garnish by grating the remaining hard-boiled eggs across the top.',
      image_url:
        'https://images.squarespace-cdn.com/content/v1/618055acf887be52d1f24d8e/b9edb005-12ba-4054-b274-5c0ee2d710e6/mainese-pink-potato-salad-1500x1000.jpg?format=1000w',
    },
    {
      name: 'Pia Niue',
      country: 'Niue',
      category: 'Dessert',
      ingredients:
        '1 cup arrowroot starch (pia) or tapioca starch, 1 cup coconut cream, 1/3 cup sugar, 1 cup water, a pinch of salt',
      instructions:
        '1. In a mixing bowl, dissolve the arrowroot starch in cold water until completely smooth. 2. In a saucepan, warm the coconut cream over low heat along with the sugar and a pinch of salt. 3. Slowly pour the starch and water mixture into the warm coconut cream, stirring continuously to prevent lumps from forming. 4. Cook gently over medium-low heat, stirring constantly, until the mixture thickens into a glossy, translucent pudding. 5. Pour into individual serving bowls and let it cool slightly or chill before serving.',
      image_url:
        'https://i0.wp.com/pacificislandrecipe.com/wp-content/uploads/2026/04/pitako-pia-dish.webp?w=1024&ssl=1',
    },
    {
      name: 'Oka',
      country: 'Samoa',
      category: 'Appetizer / Main',
      ingredients:
        '500g fresh raw tuna or reef fish, 1 cup coconut cream, juice of 3 limes, 1/2 finely diced red onion, 1/2 diced cucumber, salt and chili to taste',
      instructions:
        '1. Slice the fresh raw fish into small bite-sized cubes. 2. Marinate the fish in fresh lime juice for about 15-20 minutes until the outside turns opaque, then drain any excess liquid. 3. Mix in the diced red onion and cucumber. 4. Pour rich coconut cream over the mixture and gently toss to combine. 5. Season with salt and add chopped chili if desired. Serve immediately.',
      image_url:
        'https://kokosamoa.co.nz/cdn/shop/articles/oka-recipe-history-tips-serving-ideas-the-koko-samoa-586861.jpg?v=1761728104&width=880',
    },
    {
      name: 'Sapasui',
      country: 'Samoa',
      category: 'Main',
      ingredients:
        '250g glass noodles (bean thread), 500g sliced beef or pork, 1/2 cup soy sauce, 3 cloves minced garlic, 1 sliced onion, 2 tbsp grated fresh ginger, 3 cups beef stock or water, 2 tbsp cooking oil',
      instructions:
        '1. Soak the glass noodles in warm water until soft, then drain and cut into shorter lengths. 2. Heat oil in a large wok or pot over medium-high heat. Add garlic, ginger, and onions, sautéing until fragrant. 3. Add the sliced meat and brown thoroughly. 4. Pour in the soy sauce and beef stock, bringing it to a simmer. 5. Add the softened glass noodles directly into the liquid, tossing continuously so they absorb the savory sauce. 6. Simmer until the noodles are tender, translucent, and the liquid is mostly absorbed. Serve hot.',
      image_url:
        'https://kokosamoa.co.nz/cdn/shop/articles/sapa-sui-recipe-history-tips-serving-ideas-the-koko-samoa-638982.jpg?v=1746547935&width=880',
    },
    {
      name: 'Kokoda',
      country: 'Fiji',
      category: 'Appetizer / Starter',
      ingredients:
        '500g firm white fish (mahi-mahi or snapper), juice of 5 lemons or limes, 1 cup thick coconut cream, 1 finely diced red onion, 1 chopped tomato, 1 fresh chili (optional), salt to taste',
      instructions:
        "1. Dice the fresh white fish into small cubes and place in a bowl. 2. Pour the lemon or lime juice over the fish, cover, and chill in the fridge for 2-3 hours until the fish is 'cooked' by the citrus juice and opaque. 3. Drain the excess citrus juice thoroughly. 4. Fold in the diced red onion, tomato, and fresh chili. 5. Pour in the rich coconut cream, season with salt, and mix gently. 6. Serve chilled.",
      image_url:
        'https://www.crazy-cucumber.com/wp-content/uploads/2017/10/IMG_4424.jpg',
    },
    {
      name: 'Faikakai Topai',
      country: 'Tonga',
      category: 'Dessert',
      ingredients:
        '2 cups all-purpose flour, 2 tsp baking powder, 1/4 tsp salt, 3/4 cup water (for dough), 1 cup brown sugar, 1 can (400ml) coconut milk or coconut cream, 1/2 tsp vanilla extract',
      instructions:
        '1. In a large bowl, combine the flour, baking powder, and salt. Gradually add water and mix until a soft, smooth dough forms. 2. Bring a large pot of water to a boil. Drop small spoonfuls of the dough into the boiling water; they will float to the top when cooked (about 10-15 minutes). Remove with a slotted spoon and set aside. 3. In a separate saucepan, combine the brown sugar and coconut milk over medium heat, stirring constantly until it dissolves and thickens into a rich coconut caramel sauce. 4. Add the cooked dumplings into the warm caramel sauce, toss gently to coat them thoroughly, and serve warm.',
      image_url:
        'https://www.thecoconet.tv/assets/sm/upload/e1/y7/41/w6/Screen%20Shot%202017-05-10%20at%206.27.47%20PM.png?k=82bd6b34d3',
    },
  ])
}

function BirdsList() {
  //hard code some data in to test UI until set up useQuery to fetch actual data
  const testRecipes = [
    {
      id: 1,
      name: 'Vakalavalava',
      country: 'Fiji',
      category: 'Dessert',
      ingredients: 'Grated cassava, coconut cream, sugar, butter',
      instructions:
        'Mix ingredients, pour into a baking dish, and bake until golden brown and firm.',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
    },
    {
      id: 2,
      name: 'Koko Alaisa',
      country: 'Samoa',
      category: 'Breakfast / Drink',
      ingredients: 'Coco Samoa, rice, water, sugar, coconut milk',
      instructions:
        'Boil rice until soft. In a separate pot, melt cocoa mass with water and milk, then combine.',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55', // placeholder
    },
  ]
  return (
    <>
      <header>
        <h3>A collection of traditional Polynesian dishes</h3>
      </header>
      <section>
        <ul>
          {testRecipes.map((recipe) => {
            return (
              <li key={recipe.id}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  style={{
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
                <p>{recipe.country}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default BirdsList

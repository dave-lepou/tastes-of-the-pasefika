import { Recipes, RecipesData } from '../../models/recipes'
import db from '../db/connection'

const columns = [
  'id',
  'name',
  'country',
  'category',
  'ingredients',
  'instructions',
  'image_url as imageUrl',
]

//Handle CRUD Operations
//(Read ALL)
export async function getRecipes() {
  const result = await db('recipes').select(...columns)
  //console.log(result)
  return result as Recipes[]
}

//(READ One by ID)
export async function getRecipeById(id: number) {
  const result = await db('recipes')
    .select(...columns)
    .where({ id })
    .first()
  return result as Recipes
}

//CREATE (add new data)
export async function addRecipe(data: RecipesData) {
  const [recipe] = await db('recipes')
    .insert({
      name: data.name,
      country: data.country,
      category: data.category,
      ingredients: data.ingredients,
      instructions: data.instructions,
      image_url: data.imageUrl,
    })
    .returning(columns)
  return recipe as Recipes
}

//DELETE
export async function deleteRecipe(id: number) {
  return await db('recipes').where({ id }).delete()
}

//UPDATE
export async function updateRecipe(id: number, data: Partial<RecipesData>) {
  const [recipe] = await db('recipes')
    .where({ id })
    .update({
      name: data.name,
      country: data.country,
      category: data.category,
      ingredients: data.ingredients,
      instructions: data.instructions,
      image_url: data.imageUrl,
    })
    .returning(columns)
  return recipe as Recipes
}

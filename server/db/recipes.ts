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
  'samoa_reactions as samoaReactions',
  'tonga_reactions as tongaReactions',
  'fiji_reactions as fijiReactions',
  'rarotonga_reactions as rarotongaReactions',
  'niue_reactions as niueReactions',
]

//Handle CRUD Operations
//(Read ALL)
export async function getRecipes() {
  const result = await db('recipes').select(...columns)
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

//UPDATE (supports partial updates like reactions)
export async function updateRecipe(id: number, data: Partial<RecipesData>) {
  const updateData: Partial<Record<string, string | number>> = {} // 👈 Strict typing instead of 'any'

  if (data.name !== undefined) updateData.name = data.name
  if (data.country !== undefined) updateData.country = data.country
  if (data.category !== undefined) updateData.category = data.category
  if (data.ingredients !== undefined) updateData.ingredients = data.ingredients
  if (data.instructions !== undefined)
    updateData.instructions = data.instructions
  if (data.imageUrl !== undefined) updateData.image_url = data.imageUrl

  //Map incoming camelCase reaction keys to snake_case database columns
  if (data.samoaReactions !== undefined)
    updateData.samoa_reactions = data.samoaReactions
  if (data.tongaReactions !== undefined)
    updateData.tonga_reactions = data.tongaReactions
  if (data.fijiReactions !== undefined)
    updateData.fiji_reactions = data.fijiReactions
  if (data.rarotongaReactions !== undefined)
    updateData.rarotonga_reactions = data.rarotongaReactions
  if (data.niueReactions !== undefined)
    updateData.niue_reactions = data.niueReactions

  const [recipe] = await db('recipes')
    .where({ id })
    .update(updateData)
    .returning(columns)

  return recipe as Recipes
}

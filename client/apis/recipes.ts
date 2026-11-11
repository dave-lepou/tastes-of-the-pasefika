import request from 'superagent'
import { Recipes } from '../../models/recipes.ts'

const rootURL = new URL('api/v1/recipes', document.baseURI)

export async function getRecipes() {
  const res = await request.get(`${rootURL}/`)
  return res.body as Recipes[]
}

export async function getRecipesById(id: number): Promise<Recipes> {
  const res = await request.get(`${rootURL}/${id}`)
  return res.body
}

export async function addRecipe(newRecipe: RecipesData): Promise<Recipes> {
  const res = await request.post(`${rootURL}/`).send(newRecipe)
  return res.body
}

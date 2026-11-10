import request from 'superagent'
import { Recipes } from '../../models/recipes.ts'

const rootURL = new URL('api/v1/recipes', document.baseURI)

export async function getRecipes() {
  const res = await request.get(`${rootURL}/`)
  return res.body as Recipes[]
}

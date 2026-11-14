import request from 'superagent'
import { Stories, StoriesData } from '../../models/stories'

const rootUrl = '/api/v1/stories'

// Fetch all stories (for the "Your Stories" community page)
export async function getStories(): Promise<Stories[]> {
  const res = await request.get(rootUrl)
  return res.body as Stories[]
}

// Fetch all stories tied to a specific recipe (for the RecipesDetail page)
export async function getStoriesByRecipeId(
  recipeId: number,
): Promise<Stories[]> {
  const res = await request.get(`${rootUrl}/recipe/${recipeId}`)
  return res.body as Stories[]
}

// Add a new community story
export async function addStory(newStory: StoriesData): Promise<Stories> {
  const res = await request.post(rootUrl).send(newStory)
  return res.body as Stories
}

// Update a story (for reacting with flag buttons or editing)
export async function updateStory(
  id: number,
  updatedData: Partial<StoriesData>,
): Promise<Stories> {
  const res = await request.patch(`${rootUrl}/${id}`).send(updatedData)
  return res.body as Stories
}

// Delete a story
export async function deleteStory(id: number): Promise<void> {
  await request.delete(`${rootUrl}/${id}`)
}

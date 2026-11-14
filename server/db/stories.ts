import { Stories, StoriesData } from '../../models/stories'
import db from '../db/connection'

const columns = [
  'id',
  'recipe_id as recipeId',
  'name',
  'country',
  'story',
  'image_url as imageUrl',
  'samoa_reactions as samoaReactions',
  'tonga_reactions as tongaReactions',
  'fiji_reactions as fijiReactions',
  'rarotonga_reactions as rarotongaReactions',
  'niue_reactions as niueReactions',
]

//Handle CRUD Operations (Stories)
export async function getStories() {
  const result = await db('stories').select(...columns)
  return result as Stories[]
}

//Read all stories belonging to a specific Recipe ID
export async function getStoriesByRecipeId(recipeId: number) {
  const result = await db('stories')
    .select(...columns)
    .where({ recipe_id: recipeId })
  return result as Stories[]
}

//CREATE (add new data)
export async function addStory(data: StoriesData) {
  const [story] = await db('stories')
    .insert({
      recipe_id: data.recipeId,
      name: data.name,
      country: data.country,
      story: data.story,
      image_url: data.imageUrl,
    })
    .returning(columns)
  return story as Stories
}

//DELETE
export async function deleteStory(id: number) {
  return await db('stories').where({ id }).delete()
}

//UPDATE Story details
export async function updateStory(id: number, data: Partial<StoriesData>) {
  const [story] = await db('stories')
    .where({ id })
    .update({
      recipe_id: data.recipeId,
      name: data.name,
      country: data.country,
      story: data.story,
      image_url: data.imageUrl,
    })
    .returning(columns)
  return story as Stories
}

//UPDATE / INCREMENT Reactions
export async function updateStoryReaction(id: number, reactionField: string) {
  // Map friendly frontend keys to exact database snake_case columns
  const columnMap: Record<string, string> = {
    samoa: 'samoa_reactions',
    tonga: 'tonga_reactions',
    fiji: 'fiji_reactions',
    rarotonga: 'rarotonga_reactions',
    niue: 'niue_reactions',
  }

  const dbColumn = columnMap[reactionField]
  if (!dbColumn) {
    throw new Error('Invalid reaction type')
  }

  await db('stories').where({ id }).increment(dbColumn, 1)

  // Fetch and return the updated story row
  const [story] = await db('stories')
    .select(...columns)
    .where({ id })
  return story as Stories
}

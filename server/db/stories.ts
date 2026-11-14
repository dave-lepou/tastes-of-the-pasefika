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
  console.log(result)
  return result as Stories[]
}

//Read stories by Recipe ID
export async function getStoriesById(id: number) {
  const result = await db('stories')
    .select(...columns)
    .where({ id })
    .first()
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

//UPDATE
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

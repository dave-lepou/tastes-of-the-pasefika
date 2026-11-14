import express from 'express'
import * as db from '../db/stories'

const router = express.Router()

//Handle CRUD Operations
// GET /api/v1/stories
router.get('/', async (req, res) => {
  try {
    const stories = await db.getStories()

    res.json(stories)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/stories/recipe/:recipeId
router.get('/recipe/:recipeId', async (req, res) => {
  try {
    const stories = await db.getStoriesByRecipeId(Number(req.params.recipeId))
    res.json(stories)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Oops something went wrong')
  }
})

// POST /api/v1/stories
router.post('/', async (req, res) => {
  try {
    const story = await db.addStory(req.body)
    res.status(201).json(story)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Oops something went wrong')
  }
})

// PATCH /api/v1/stories/:id
router.patch('/:id', async (req, res) => {
  try {
    console.log('PATCH /stories/:id body received:', req.body) // Check your terminal to see what's sent!

    let story
    // Check various ways the frontend might send a reaction payload
    const reactionKey =
      req.body.reaction || req.body.type || Object.keys(req.body)[0]

    const validReactions = [
      'samoa',
      'tonga',
      'fiji',
      'rarotonga',
      'niue',
      'samoaReactions',
      'tongaReactions',
      'fijiReactions',
      'rarotongaReactions',
      'niueReactions',
    ]

    if (reactionKey && validReactions.includes(reactionKey)) {
      // Normalize key (e.g. 'samoaReactions' -> 'samoa')
      const normalized = reactionKey.replace('Reactions', '').toLowerCase()
      story = await db.updateStoryReaction(Number(req.params.id), normalized)
    } else {
      story = await db.updateStory(Number(req.params.id), req.body)
    }

    if (!story) {
      res.sendStatus(404)
      return
    }

    res.json(story)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Oops something went wrong')
  }
})

// DELETE /api/v1/stories/:id
router.delete('/:id', async (req, res) => {
  try {
    const count = await db.deleteStory(Number(req.params.id))
    if (!count) {
      res.sendStatus(404)
      return
    }

    res.sendStatus(204)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Oops something went wrong')
  }
})

export default router

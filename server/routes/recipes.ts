import express from 'express'
import * as db from '../db/recipes'

const router = express.Router()

//Handle CRUD Operations
// GET /api/v1/recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await db.getRecipes()

    res.json(recipes)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await db.getRecipeById(Number(req.params.id))
    if (!recipe) {
      res.sendStatus(404)
      return
    }

    res.json(recipe)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Oops something went wrong')
  }
})

//POST /api/v1/recipes
router.post('/', async (req, res) => {
  try {
    const recipe = await db.addRecipe(req.body)

    res.status(201).json(recipe)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Oops something went wrong')
  }
})

//PATCH /api/v1/recipes/:id
router.patch('/:id', async (req, res) => {
  try {
    const recipe = await db.updateRecipe(Number(req.params.id), req.body)
    if (!recipe) {
      res.sendStatus(404)
      return
    }

    res.json(recipe)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Oops something went wrong')
  }
})

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const count = await db.deleteRecipe(Number(req.params.id))
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

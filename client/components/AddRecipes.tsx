import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RecipesData } from '../../models/recipes.ts'

const emptyRecipe: RecipesData = {
  name: '',
  country: '',
  category: '',
  ingredients: '',
  instructions: '',
  imageUrl: '',
}

export default function AddRecipe() {
  const [item, setItem] = useState<RecipesData>(emptyRecipe)
  const qc = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (recipe: RecipesData) => addRecipe(recipe),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recipes'] })
      setItem(emptyRecipe)
    },
  })

  //handle changes for both input and text area elements
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setItem((prev) => ({ ...prev, [name as keyof RecipesData]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate(item)
  }

  return (
    <div>
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country/Region: </label>
          <input
            id="country"
            type="text"
            name="country"
            value={item.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category: </label>
          <input
            id="category"
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Image URL: </label>
          <input
            id="imageUrl"
            type="url"
            name="imageUrl"
            value={item.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="ingredients">Ingredients: </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={item.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="instructions">Instructions: </label>
          <textarea
            id="instructions"
            name="instructions"
            value={item.instructions}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Saving...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  )
}

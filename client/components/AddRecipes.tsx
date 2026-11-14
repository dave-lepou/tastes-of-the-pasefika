import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router'
import { addRecipe } from '../apis/recipes.ts'
import { RecipesData } from '../../models/recipes.ts'

const emptyRecipe: RecipesData = {
  name: '',
  country: '',
  category: '',
  imageUrl: '',
  ingredients: '',
  instructions: '',
}

export default function AddRecipe() {
  const [recipe, setRecipe] = useState<RecipesData>(emptyRecipe)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (newRecipe: RecipesData) => addRecipe(newRecipe),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recipes'] })
      navigate('/')
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setRecipe((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate(recipe)
  }

  return (
    <div className="add-recipe-wrapper">
      <Link to="/" className="back-home-link">
        ← Back to Home
      </Link>

      <div className="add-recipe-card">
        <h2>Share a Traditional Recipe</h2>
        <p className="add-recipe-subtitle">
          Add a treasured family or cultural dish to the Pasefika collection.
        </p>

        <form onSubmit={handleSubmit} className="add-recipe-form">
          <div className="form-group">
            <label htmlFor="name">Recipe Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              placeholder="e.g., Sapasui, Lu Sipi, 'Ota 'Ika"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Island / Country</label>
            <input
              id="country"
              type="text"
              name="country"
              value={recipe.country}
              onChange={handleChange}
              placeholder="e.g., Samoa, Tonga, Fiji, Cook Islands"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              value={recipe.category}
              onChange={handleChange}
              placeholder="e.g., Main Dish, Seafood, Dessert"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              rows={4}
              placeholder="List ingredients line by line..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the preparation steps..."
              required
            />
          </div>

          <button
            type="submit"
            className="submit-recipe-btn"
            disabled={addMutation.isPending}
          >
            {addMutation.isPending ? 'Publishing Recipe...' : 'Publish Recipe'}
          </button>
        </form>
      </div>
    </div>
  )
}

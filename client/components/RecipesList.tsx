import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../apis/recipes.ts'
import { Link } from 'react-router'

function RecipesList() {
  const {
    data: recipes,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })

  if (isPending) return <p className="loading-state">Loading...</p>
  if (isError) return <p className="error-state">Error... {error.message}</p>

  const recipeList = recipes ?? []

  return (
    <div className="recipes-container">
      <header className="recipes-header">
        <h3>A collection of traditional Polynesian dishes</h3>
        <Link to="/recipes/new" className="add-recipe-link">
          + Add New Recipe
        </Link>
      </header>

      <section>
        <ul className="recipe-grid-list">
          {recipeList.map((recipe) => {
            return (
              <li key={recipe.id} className="recipe-card">
                <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="recipe-card-img"
                  />
                  <h3>{recipe.name}</h3>
                  <p className="recipe-card-country">{recipe.country}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default RecipesList

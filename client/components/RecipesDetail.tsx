import { useParams, Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getRecipesById } from '../apis/recipes.ts'

//use useParams to connect to route path
//use useQuery to detch the specific data handle loading / error states
//(return) lay out my data how i want to display it

export default function RecipesDetail() {
  const { id } = useParams()

  const {
    data: recipe,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipesById(Number(id)), // 👈 Pass the ID to your API call
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error... {error.message}</p>
  if (!recipe) return <p>Sorry recipe not found!</p>

  return (
    <div>
      <Link to="/">Back to List</Link>

      <div>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          style={{
            width: '300px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        <h2>{recipe.name}</h2>
        <p>
          {recipe.country} - {recipe.category}
        </p>
      </div>

      <div>
        <h3>Ingredients</h3>
        <p>{recipe.ingredients}</p>
      </div>

      <div>
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  )
}

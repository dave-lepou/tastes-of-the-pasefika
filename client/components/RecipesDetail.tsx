import { useParams, Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getRecipesById } from '../apis/recipes.ts'
import DeleteButton from './DeleteRecipe.tsx'

export default function RecipesDetail() {
  const { id } = useParams()

  const {
    data: recipe,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipesById(Number(id)),
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error... {error.message}</p>
  if (!recipe) return <p>Sorry recipe not found!</p>

  return (
    <div>
      <Link to="/">Home</Link>

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
        <DeleteButton id={recipe.id} />
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

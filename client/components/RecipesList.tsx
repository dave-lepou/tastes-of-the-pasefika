import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../apis/recipes.ts'
import { Link } from 'react-router'

function BirdsList() {
  //use useQuery to fetch data
  const {
    data: recipes,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error... {error.message}</p>

  return (
    <>
      <header>
        <h3>A collection of traditional Polynesian and Aotearoa dishes</h3>
      </header>
      <section>
        <ul>
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>
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
                  <p>
                    {recipe.name} - {recipe.country}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default BirdsList

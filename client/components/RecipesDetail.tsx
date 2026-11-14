import { useParams, Link } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRecipesById } from '../apis/recipes.ts'
import { getStoriesByRecipeId, updateStory } from '../apis/stories.ts'
import DeleteButton from './DeleteRecipe.tsx'

//add features for adding stories to recipes / add reaction buttons to stories and counter
export default function RecipesDetail() {
  const { id } = useParams()
  const recipeId = Number(id)
  const qc = useQueryClient()

  const {
    data: recipe,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipesById(Number(id)),
  })

  //grab all stories linked to this recipe
  const { data: stories, isPending: storiesPending } = useQuery({
    queryKey: ['stories', recipeId],
    queryFn: () => getStoriesByRecipeId(recipeId),
  })

  // Mutation for handling Pacific nation flag reactions
  const reactionMutation = useMutation({
    mutationFn: async (variables: {
      storyId: number
      updatedReactions: Record<string, number>
    }) => {
      return await updateStory(variables.storyId, variables.updatedReactions)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['stories', recipeId] })
    },
  })

  //Handle clicking a flag reaction button
  const handleReaction = (
    story: any,
    nation: 'samoa' | 'tonga' | 'fiji' | 'rarotonga' | 'niue',
  ) => {
    const key = `${nation}Reactions`
    const currentCount = Number(story[key]) || 0

    reactionMutation.mutate({
      storyId: story.id,
      updatedReactions: {
        [key]: currentCount + 1,
      },
    })
  }

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

      <hr style={{ margin: '2rem 0' }} />

      {/* --- COMMUNITY STORIES SECTION --- */}
      <section>
        <h3>Community Stories & Memories</h3>

        {storiesPending && <p>Loading stories...</p>}

        {stories && stories.length === 0 && (
          <p>
            No stories shared for this recipe yet. Be the first to share your
            memory!
          </p>
        )}

        {stories &&
          stories.map((story) => (
            <div
              key={story.id}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            >
              <p>
                <strong>{story.name}</strong> from <em>{story.country}</em>
              </p>
              <p>{story.story}</p>
              {story.imageUrl && (
                <img
                  src={story.imageUrl}
                  alt={story.name}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              )}

              {/* Pacific Nation Flag Reaction Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginTop: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <button onClick={() => handleReaction(story, 'samoa')}>
                  🇼🇸 ({story.samoaReactions})
                </button>
                <button onClick={() => handleReaction(story, 'tonga')}>
                  🇹🇴 ({story.tongaReactions})
                </button>
                <button onClick={() => handleReaction(story, 'fiji')}>
                  🇫🇯 ({story.fijiReactions})
                </button>
                <button onClick={() => handleReaction(story, 'rarotonga')}>
                  🇨🇰 ({story.rarotongaReactions})
                </button>
                <button onClick={() => handleReaction(story, 'niue')}>
                  🇳🇺 ({story.niueReactions})
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  )
}

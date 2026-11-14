import { useParams, Link } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRecipesById, updateRecipeReactions } from '../apis/recipes.ts'
import { getStoriesByRecipeId, updateStory } from '../apis/stories.ts'
import DeleteButton from './DeleteRecipe.tsx'
import AddStory from './AddStory.tsx'
import { Stories } from '../../models/stories.ts'

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

  // grab all stories linked to this recipe
  const { data: stories, isPending: storiesPending } = useQuery({
    queryKey: ['stories', recipeId],
    queryFn: () => getStoriesByRecipeId(recipeId),
  })

  // Mutation for handling recipe reactions
  const recipeReactionMutation = useMutation({
    mutationFn: async (updatedReactions: Record<string, number>) => {
      return await updateRecipeReactions(recipeId, updatedReactions)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recipe', id] })
    },
  })

  // Handle clicking a recipe flag reaction button
  const handleRecipeReaction = (
    nation: 'samoa' | 'tonga' | 'fiji' | 'rarotonga' | 'niue',
  ) => {
    if (!recipe) return

    const counts = {
      samoa: recipe.samoaReactions,
      tonga: recipe.tongaReactions,
      fiji: recipe.fijiReactions,
      rarotonga: recipe.rarotongaReactions,
      niue: recipe.niueReactions,
    }

    const key = `${nation}Reactions`
    const currentCount = Number(counts[nation]) || 0

    recipeReactionMutation.mutate({
      [key]: currentCount + 1,
    })
  }

  // Mutation for handling story reactions
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

  // Handle clicking a story flag reaction button
  const handleReaction = (
    story: Stories,
    nation: 'samoa' | 'tonga' | 'fiji' | 'rarotonga' | 'niue',
  ) => {
    const counts = {
      samoa: story.samoaReactions,
      tonga: story.tongaReactions,
      fiji: story.fijiReactions,
      rarotonga: story.rarotongaReactions,
      niue: story.niueReactions,
    }

    const key = `${nation}Reactions`
    const currentCount = Number(counts[nation]) || 0

    reactionMutation.mutate({
      storyId: story.id,
      updatedReactions: {
        [key]: currentCount + 1,
      },
    })
  }

  if (isPending) return <p className="loading-state">Loading...</p>
  if (isError) return <p className="error-state">Error... {error.message}</p>
  if (!recipe) return <p className="error-state">Sorry recipe not found!</p>

  return (
    <div className="recipe-detail-wrapper">
      <Link to="/" className="back-home-link">
        ← Back to Home
      </Link>

      {/* Header Section (Side-by-side photo and title info) */}
      <div className="recipe-hero-section">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="recipe-detail-img"
        />
        <div className="recipe-hero-info">
          <h2>{recipe.name}</h2>
          <p className="recipe-meta">
            {recipe.country} • {recipe.category}
          </p>

          {/* Recipe Reaction Buttons */}
          <div
            className="reaction-buttons-container"
            style={{ margin: '0.5rem 0 1rem 0' }}
          >
            <span
              style={{
                fontSize: '0.9rem',
                color: 'var(--pasa-text-muted)',
                alignSelf: 'center',
              }}
            >
              Show some love from:
            </span>
            <button
              className="reaction-btn"
              onClick={() => handleRecipeReaction('samoa')}
            >
              🇼🇸 <span>{recipe.samoaReactions}</span>
            </button>
            <button
              className="reaction-btn"
              onClick={() => handleRecipeReaction('tonga')}
            >
              🇹🇴 <span>{recipe.tongaReactions}</span>
            </button>
            <button
              className="reaction-btn"
              onClick={() => handleRecipeReaction('fiji')}
            >
              🇫🇯 <span>{recipe.fijiReactions}</span>
            </button>
            <button
              className="reaction-btn"
              onClick={() => handleRecipeReaction('rarotonga')}
            >
              🇨🇰 <span>{recipe.rarotongaReactions}</span>
            </button>
            <button
              className="reaction-btn"
              onClick={() => handleRecipeReaction('niue')}
            >
              🇳🇺 <span>{recipe.niueReactions}</span>
            </button>
          </div>

          <DeleteButton id={recipe.id} />
        </div>
      </div>

      {/* Recipe Content Section */}
      <div className="recipe-content-grid">
        <div className="recipe-section-box">
          <h3>Ingredients</h3>
          <p>{recipe.ingredients}</p>
        </div>

        <div className="recipe-section-box">
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
      </div>

      <hr className="pasa-divider" />

      {/* Community Stories & Memories Section */}
      <section className="community-stories-section">
        <h3>Community Stories & Memories</h3>

        {storiesPending && <p>Loading stories...</p>}

        {stories && stories.length === 0 && (
          <p
            style={{ color: 'var(--pasa-text-muted)', marginBottom: '1.5rem' }}
          >
            No stories shared for this recipe yet. Be the first to share your
            memory below!
          </p>
        )}

        {/* Stories Grid */}
        <div className="stories-grid">
          {stories &&
            stories.map((story) => (
              <div key={story.id} className="story-card">
                <p className="story-author">
                  <strong>{story.name}</strong> from <em>{story.country}</em>
                </p>
                <p className="story-text">&ldquo;{story.story}&rdquo;</p>

                {story.imageUrl && (
                  <img
                    src={story.imageUrl}
                    alt={story.name}
                    className="story-image"
                  />
                )}

                {/* Pasefika Flag Reaction Buttons for Stories */}
                <div className="reaction-buttons-container">
                  <button
                    className="reaction-btn"
                    onClick={() => handleReaction(story, 'samoa')}
                  >
                    🇼🇸 <span>{story.samoaReactions}</span>
                  </button>
                  <button
                    className="reaction-btn"
                    onClick={() => handleReaction(story, 'tonga')}
                  >
                    🇹🇴 <span>{story.tongaReactions}</span>
                  </button>
                  <button
                    className="reaction-btn"
                    onClick={() => handleReaction(story, 'fiji')}
                  >
                    🇫🇯 <span>{story.fijiReactions}</span>
                  </button>
                  <button
                    className="reaction-btn"
                    onClick={() => handleReaction(story, 'rarotonga')}
                  >
                    🇨🇰 <span>{story.rarotongaReactions}</span>
                  </button>
                  <button
                    className="reaction-btn"
                    onClick={() => handleReaction(story, 'niue')}
                  >
                    🇳🇺 <span>{story.niueReactions}</span>
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Add Story Toggle Button & Form placed cleanly below the stories */}
        <AddStory recipeId={recipeId} />
      </section>
    </div>
  )
}

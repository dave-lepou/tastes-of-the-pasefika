import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { StoriesData } from '../../models/stories.ts'
import { addStory } from '../apis/stories.ts'

interface Props {
  recipeId: number
}

const emptyStory: StoriesData = {
  recipeId: 0,
  name: '',
  country: '',
  story: '',
  imageUrl: '',
}

export default function AddStory({ recipeId }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState<StoriesData>({
    ...emptyStory,
    recipeId,
  })
  const qc = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (story: StoriesData) => addStory(story),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['stories', recipeId] })
      setItem({ ...emptyStory, recipeId })
      setIsOpen(false) // Close form after successful submission
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setItem((prev) => ({ ...prev, [name as keyof StoriesData]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate(item)
  }

  return (
    <div style={{ margin: '2rem 0', textAlign: 'center' }}>
      {/* 👈 Toggle Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="reaction-btn"
          style={{
            background: 'var(--pasa-gold, #d4af37)',
            color: '#121619',
            fontWeight: '600',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          + Share Your Memory & Story
        </button>
      ) : (
        /* 👈 The Form Appears Below Stories When Clicked */
        <div
          style={{
            background: 'var(--pasa-card-dark, #1e242b)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'left',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h4 style={{ margin: 0, color: 'var(--pasa-sand, #f0ead6)' }}>
              Share Your Memory & Story
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--pasa-text-muted)',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
            >
              ✕ Cancel
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label
                htmlFor={`name-${recipeId}`}
                style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.9rem',
                }}
              >
                Your Name:
              </label>
              <input
                id={`name-${recipeId}`}
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  background: '#121619',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
              />
            </div>

            <div>
              <label
                htmlFor={`country-${recipeId}`}
                style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.9rem',
                }}
              >
                Your Island / Country:
              </label>
              <input
                id={`country-${recipeId}`}
                type="text"
                name="country"
                value={item.country}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  background: '#121619',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
              />
            </div>

            <div>
              <label
                htmlFor={`story-${recipeId}`}
                style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.9rem',
                }}
              >
                Your Story / Memory:
              </label>
              <textarea
                id={`story-${recipeId}`}
                name="story"
                value={item.story}
                onChange={handleChange}
                rows={4}
                required
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  background: '#121619',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
              />
            </div>

            <div>
              <label
                htmlFor={`imageUrl-${recipeId}`}
                style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.9rem',
                }}
              >
                Image URL (Optional):
              </label>
              <input
                id={`imageUrl-${recipeId}`}
                type="url"
                name="imageUrl"
                value={item.imageUrl}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  background: '#121619',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={addMutation.isPending}
              style={{
                background: 'var(--pasa-gold, #d4af37)',
                color: '#121619',
                fontWeight: '600',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '0.5rem',
              }}
            >
              {addMutation.isPending ? 'Sharing Story...' : 'Submit Story'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { StoriesData } from '../../models/stories.ts'
import { addStory } from '../apis/stories.ts'

const emptyStory: StoriesData = {
  recipeId: 0,
  name: '',
  country: '',
  story: '',
  imageUrl: '',
}

export default function AddStory({ recipeId }: Props) {
  const [item, setItem] = useState<StoriesData>(emptyStory)
  const qc = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (story: StoriesData) => addStory(story),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['stories', recipeId] })
      setItem({ ...emptyStory, recipeId })
    },
  })

  //handle changes for both input and text area elements
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
    <div
      style={{
        border: '1px dashed #ccc',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem',
      }}
    >
      <h4>Share Your Memory & Story</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={`name-${recipeId}`}>Your Name: </label>
          <input
            id={`name-${recipeId}`}
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor={`country-${recipeId}`}>Your Island / Country: </label>
          <input
            id={`country-${recipeId}`}
            type="text"
            name="country"
            value={item.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor={`story-${recipeId}`}>Your Story / Memory: </label>
          <textarea
            id={`story-${recipeId}`}
            name="story"
            value={item.story}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor={`imageUrl-${recipeId}`}>Image URL: </label>
          <input
            id={`imageUrl-${recipeId}`}
            type="url"
            name="imageUrl"
            value={item.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Sharing Story...' : 'Submit Story'}
        </button>
      </form>
    </div>
  )
}

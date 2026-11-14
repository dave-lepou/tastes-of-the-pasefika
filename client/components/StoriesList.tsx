import { useQuery } from '@tanstack/react-query'
import { getStories } from '../apis/stories.ts'
import { Link } from 'react-router'
import { useState } from 'react'

export default function StoriesList() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all')

  const {
    data: stories,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['stories', 'all'],
    queryFn: () => getStories(),
  })

  if (isPending) return <p style={{ textAlign: 'center' }}>Loading...</p>
  if (isError)
    return <p style={{ textAlign: 'center' }}>Error... {error.message}</p>

  const storyList = stories ?? []

  const countries = [
    'all',
    ...Array.from(new Set(storyList.map((s) => s.country))),
  ]

  const filteredStories =
    selectedCountry === 'all'
      ? storyList
      : storyList.filter((s) => s.country === selectedCountry)

  return (
    // 👈 Added style={{ textAlign: 'center' }} to center everything on the page
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h2>Pasefika Community Stories & Memories</h2>
      <p
        style={{
          color: 'var(--pasa-text-muted, #9aa5b1)',
          marginBottom: '2rem',
        }}
      >
        Read heartfelt stories shared by whānau and visitors across the Pacific.
      </p>

      {/* Filter Dropdown */}
      <div
        style={{
          margin: '2rem 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <label htmlFor="country-filter" style={{ fontWeight: '500' }}>
          Filter by Island / Country:
        </label>
        <select
          id="country-filter"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            background: 'var(--pasa-card-dark, #1e242b)',
            color: 'var(--pasa-sand, #f0ead6)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Stories Grid */}
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          justifyItems: 'center',
        }}
      >
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="story-card" // Uses your centered story card CSS
          >
            {story.imageUrl && (
              <img
                src={story.imageUrl}
                alt={story.name}
                className="story-image"
              />
            )}
            <h3>
              {story.name} ({story.country})
            </h3>
            <p className="story-text">&ldquo;{story.story}&rdquo;</p>
            <Link
              to={`/recipes/${story.recipeId}`}
              style={{
                color: 'var(--pasa-gold, #d4af37)',
                textDecoration: 'underline',
                marginTop: '1rem',
                display: 'inline-block',
              }}
            >
              View Associated Recipe →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

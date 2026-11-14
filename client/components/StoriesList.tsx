import { useQuery } from '@tanstack/react-query'
import { getStories } from '../apis/stories.ts'
import { Link } from 'react-router'
import { useState } from 'react'
import { all } from 'superagent/lib/request-base'

export default function StoriesList() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all')

  //use useQuery to fetch data
  const {
    data: stories,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['stories', all],
    queryFn: () => getStories(),
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error... {error.message}</p>

  //fallback safety array
  const storyList = stories ?? []

  //grab unique countries for the filter dropdown
  const countries = [
    'all',
    ...Array.from(new Set(storyList.map((s) => s.country))),
  ]
  //filter stories based on dropdown
  const filteredStories =
    selectedCountry === 'all'
      ? storyList
      : storyList.filter((s) => s.country === selectedCountry)

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pasefika Community Stories & Memories</h2>
      <p>
        Read heartfelt stories shared by whānau and visitors across the Pacific.
      </p>

      {/* Filter Dropdown */}
      <div style={{ margin: '1.5rem 0' }}>
        <label
          htmlFor="country-filter"
          style={{ marginRight: '0.5rem', fontWeight: 'bold' }}
        >
          Filter by Island / Country:
        </label>
        <select
          id="country-filter"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Stories Grid / List */}
      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        {filteredStories.map((story) => (
          <div
            key={story.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              background: '#fff',
            }}
          >
            {story.imageUrl && (
              <img
                src={story.imageUrl}
                alt={story.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                }}
              />
            )}
            <h3>
              {story.name} ({story.country})
            </h3>
            <p style={{ fontStyle: 'italic', margin: '1rem 0' }}>
              "{story.story}"
            </p>
            <Link
              to={`/recipes/${story.recipeId}`}
              style={{ color: '#0066cc', textDecoration: 'underline' }}
            >
              View Associated Recipe →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

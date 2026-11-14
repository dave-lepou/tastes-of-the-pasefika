import { Link } from 'react-router'

export default function NavBar() {
  return (
    <nav style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/recipes/new">Add your recipe</Link>
      <Link to="stories">Stories from the Pasefika</Link>
    </nav>
  )
}

import { Outlet } from 'react-router'
import NavBar from './NavBar.tsx'

function App() {
  return (
    <>
      <header>
        <h1>Tastes of the Pasefika</h1>
        <NavBar />
      </header>
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}

export default App

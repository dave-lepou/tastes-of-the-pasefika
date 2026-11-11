import { Outlet } from 'react-router'

function App() {
  return (
    <>
      <header>
        <h1>Tastes of the Pasefika</h1>
      </header>
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}

export default App

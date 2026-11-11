import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router'
import App from './components/App'
import RecipesList from './components/RecipesList'
import RecipesDetail from './components/RecipesDetail'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<RecipesList />} />
    <Route path="recipes/:id" element={<RecipesDetail />} />
  </Route>,
)

const router = createBrowserRouter(routes)

export default router

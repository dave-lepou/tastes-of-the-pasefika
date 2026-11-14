import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router'
import App from './components/App'
import RecipesList from './components/RecipesList'
import RecipesDetail from './components/RecipesDetail'
import AddRecipe from './components/AddRecipes'
import Home from './components/Home'
import AboutPage from './components/AboutPage'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="recipes" element={<RecipesList />} />
    <Route path="recipes/:id" element={<RecipesDetail />} />
    <Route path="recipes/new" element={<AddRecipe />} />
  </Route>,
)

const router = createBrowserRouter(routes)

export default router

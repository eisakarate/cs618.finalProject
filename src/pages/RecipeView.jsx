import { ViewRecipe } from '../components/ViewRecipe.jsx'
import { Header } from '../components/header.jsx'
import { Link } from 'react-router-dom'

export function RecipeView() {
  return (
    <div style={{ padding: 8 }}>
      <Header />
      <ViewRecipe />
      <Link to='/'>Back to main page</Link>
    </div>
  )
}

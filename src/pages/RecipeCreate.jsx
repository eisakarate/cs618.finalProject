import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { Header } from '../components/header.jsx'
import { Link } from 'react-router-dom'

export function RecipeCreate() {
  return (
    <div style={{ padding: 8 }}>
      <Header />
      <CreateRecipe />
      <Link to='/'>Back to main page</Link>
    </div>
  )
}

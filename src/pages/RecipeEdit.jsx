import { EditRecipe } from '../components/EditRecipe'
import { Header } from '../components/header.jsx'
import { Link } from 'react-router-dom'

export function RecipeEdit() {
  return (
    <div style={{ padding: 8 }}>
      <Header />
      <EditRecipe />
      <Link to='/'>Back to main page</Link>
    </div>
  )
}

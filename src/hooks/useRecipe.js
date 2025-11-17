import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function useRecipe() {
  const { socket } = useSocket()
  const [recipeIds, setRecipes] = useState([])
  function receiveMessage(recipeId) {
    setRecipes((recipeIds) => [...recipeIds, recipeId])
  }
  useEffect(() => {
    socket.on('recipe.added', receiveMessage)
    return () => socket.off('recipe.added', receiveMessage)
  }, [])
  function sendMessage(recipeId) {
    socket.emit('recipe.added', recipeId)
  }

  function clearRecipes() {
    setRecipes([])
  }
  return { recipeIds, sendMessage, clearRecipes }
}

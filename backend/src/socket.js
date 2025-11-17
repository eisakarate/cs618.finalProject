export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('user connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id)
    })
    socket.on('recipe.added', (recipeId) => {
      console.log(`Recipe Added thing: ${socket.id}: ${recipeId}`)
      socket.broadcast.emit('recipe.added', {
        recipeId,
      })
    })
  })
}

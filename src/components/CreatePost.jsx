import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../api/posts.js'

// how to call the Post API?
//use a mutation (useMutation)

export function CreatePost() {
  //define states
  const [title, setTitle] = useState('') //setTitle is an "alias" to "function" that set the state value for title
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')
  const [bibliography, setBibliography] = useState('') //initiialize to empty-string

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents, bibliography }), //call the mutate using State, call the API function

    //invalidate the query in the "post"
    //invalidating the Query makes the underlying data "invalid", and causes the component to requery from the database
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  //define a function to submit
  const handleSubmit = (e) => {
    //prevent full postback, so that push happens in the way we want it to
    e.preventDefault()

    //push to the database
    createPostMutation.mutate() //mutate
  }

  //prevent
  return (
    <form onSubmit={handleSubmit}>
      {/* {e}=>e.preventDefault(), makes it so that page doesn't refresh on click on the submission control */}
      <div>
        <label htmlFor='create-title'>Title: </label>
        {/* add a field for entering a title */}
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        {/* add a field for entering an author */}
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-bibliography'>Bibliography: </label>
        {/* add a field for entering an author */}
        <input
          type='text'
          name='create-bibliography'
          id='create-bibliography'
          value={bibliography}
          onChange={(e) => setBibliography(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor='blog-content'>Blog Content: </label>
      {/* add a field for entering a content? */}
      <textarea
        name='blog-content'
        id='blog-content'
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      {/* disable when there is no title */}
      {/* Display correct button text correctly */}
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />
      {/* display a status message */}
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}

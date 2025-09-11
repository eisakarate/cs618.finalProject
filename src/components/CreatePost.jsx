export function CreatePost() {
  //prevent
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* {e}=>e.preventDefault(), makes it so that page doesn't refresh on click on the submission control */}
      <div>
        <label htmlFor='create-title'>Title: </label>
        {/* add a field for entering a title */}
        <input type='text' name='create-title' id='create-title' />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        {/* add a field for entering an author */}
        <input type='text' name='create-author' id='create-author' />
      </div>
      <br />
      {/* add a field for entering a content? */}
      <textarea name='blog-content' id='blog-content' />
      <br />
      <br />
      <input type='submit' value='Create' />
    </form>
  )
}

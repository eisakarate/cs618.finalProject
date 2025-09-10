import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

//Fragment -> group it, sort of like a DIV?
//.map -> creates a new array by applyig a provided function to each element of an existing array
// ... -> spread operator
//      applies members of the 'post' to corresponding memers of Post prototype

export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}

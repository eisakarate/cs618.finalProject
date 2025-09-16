import PropTypes from 'prop-types'

/*
 *.jsx allows embedding of HTML with JavaScript, sort of like Blazor
 */
export function Post({ title, contents, author, bibliography }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
      <div>
        <h4>Bibilography:</h4>
        <ul>
          {bibliography.map((bibliography, index) => (
            <li key={index}>{bibliography}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  bibliography: PropTypes.arrayOf(PropTypes.string),
}

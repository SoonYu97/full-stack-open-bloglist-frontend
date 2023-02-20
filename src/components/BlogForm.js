import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='blogFormDiv'>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              type='text'
              required
              value={title}
              id='title-input'
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type='text'
              required
              value={author}
              id='author-input'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type='text'
              required
              value={url}
              id='url-input'
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button id='blog-submit-button' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm

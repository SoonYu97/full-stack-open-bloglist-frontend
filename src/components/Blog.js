import { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const updateLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(updatedBlog)
  }

  const deleteB = () => {
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }
  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button name='more' onClick={() => setShowMore(!showMore)}>
        {showMore ? 'hide' : 'view'}
      </button>
      {showMore && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            like{blog.likes > 1 && 's'} {blog.likes}{' '}
            <button name='like' id='like-button' onClick={updateLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.name === blog.user.name && <div>
            <button name='delete' id='delete-button' onClick={deleteB}>delete</button>
          </div>}
        </div>
      )}
    </div>
  )
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // updateBlog: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
}

export default Blog

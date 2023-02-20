import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const timeOut = 2500

  const compareLike = (a, b) => b.likes - a.likes

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(compareLike))
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ type: 'error', body: exception.response.data.error })
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, timeOut)
    }
  }

  const logout = async (e) => {
    e.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.addBlog(blogObject)
      setBlogs(blogs.concat(blog).sort(compareLike))
      blogFormRef.current.toggleVisibility()
      setMessage({
        type: 'success',
        body: `a new blog ${blog.title} by ${blog.author} added`,
      })
      setTimeout(() => {
        setMessage(null)
      }, timeOut)
    } catch (exception) {
      setMessage({ type: 'error', body: exception.response.data.error })
      setTimeout(() => {
        setMessage(null)
      }, timeOut)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const blog = await blogService.updateBlog(blogObject)
      setBlogs(
        blogs.map((b) => (b.id === blog.id ? blog : b)).sort(compareLike)
      )
      setMessage({
        type: 'success',
        body: `a blog ${blog.title} by ${blog.author} updated`,
      })

      setTimeout(() => {
        setMessage(null)
      }, timeOut)
    } catch (exception) {
      setMessage({ type: 'error', body: exception.response.data.error })
      setTimeout(() => {
        setMessage(null)
      }, timeOut)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(({ id }) => id !== blog.id).sort(compareLike))
      setMessage({
        type: 'success',
        body: `a blog ${blog.title} by ${blog.author} deleted`,
      })
      setTimeout(() => {
        setMessage(null)
      }, timeOut)
    } catch (exception) {
      console.log(exception)
      setMessage({ type: 'error', body: exception.response.data.error })
      setTimeout(() => {
        setMessage(null)
      }, timeOut)
    }
  }

  const loginProps = { username, password, setUsername, setPassword, login }

  const blogFormRef = useRef()

  return (
    <div>
      {message !== null && <Notification message={message} />}
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm {...loginProps} />
        </Togglable>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App

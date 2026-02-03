import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Login from "./components/Login"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState({})
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (target) => {
    const changedBlog = {}

    changedBlog.title = (target.id == "title") ? target.value: blog.title
    changedBlog.author = (target.id == "author") ? target.value: blog.author
    changedBlog.url = (target.id == "url") ? target.value: blog.url
    setBlog(changedBlog)
  }

  const handleBlogPost = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setBlog({})
    } catch {
      setErrorMessage('blog creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage}/>
      {!user && <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
      />}
      {user && <BlogForm
      blog={blog}
      handleBlogChange={({ target }) => handleBlogChange(target)}
      handleSubmit={handleBlogPost}
      />}
      {user && <Blogs blogs={blogs}/>}
    </div>
  )
}

export default App
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
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sendMessage = (text) => {
    setMessage(text)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const handleBlogChange = (target) => {
    const changedBlog = {}
    changedBlog.title = (target.id == "title") ? target.value: blog.title
    changedBlog.author = (target.id == "author") ? target.value: blog.author
    changedBlog.url = (target.id == "url") ? target.value: blog.url
    setBlog(changedBlog)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        "loggedBlogAppUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      sendMessage("wrong credentials")
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleBlogPost = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setBlog({})
      sendMessage(`Blog ${newBlog.title} has been created`)
    } catch {
      sendMessage("blog creation failed")
    }
  }

  const handleBlogDelete = async event => {
    event.preventDefault()
    try {
      blogService.del(event.target.id)
      const newBlogs = blogs.filter(blog => blog.id.toString() != event.target.id)
      setBlogs(newBlogs)
      sendMessage("blog has been deleted")
    } catch {
      sendMessage("blog deletion failed")
    }
    
  }
  if (user === null) {
    return (
      <div>
        <Notification message={message}/>
        <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      </div>
    )
  } else {
    return (
    <div>
      <Notification message={message}/>
      <p>Logged in as {user.username}             <button onClick={handleLogout}>Log out</button></p>
      <BlogForm 
        blog={blog}
        handleBlogChange={({ target }) => handleBlogChange(target)}
        handleSubmit={handleBlogPost}
      />
      <Blogs blogs={blogs} handleSubmit={handleBlogDelete}/>
      
    </div>
  )
  }
  
}

export default App
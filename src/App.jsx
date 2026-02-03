import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Login from "./components/Login"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const createBlog = async (blog) => {
    try {
        const newBlog = await blogService.create(blog)
        setBlogs(blogs.concat(newBlog))
        setCreateVisible(false)
        sendMessage(`Blog ${newBlog.title} has been created`)
    } catch {
        sendMessage("blog creation failed")
    }
  }

  const deleteBlog = async (id) => {
    try {
        await blogService.del(id)
        const newBlogs = blogs.filter(blog => blog.id.toString() != id)
        setBlogs(newBlogs)
        sendMessage("blog has been deleted")
    } catch {
        sendMessage("blog deletion failed")
    }
  }

  const showBlog = (id) => {
    try {
        const newBlogs = blogs.map(blog => (blog.id.toString() == id) ? ({
    ...blog,
    show: !blog.show}): blog)
        setBlogs(newBlogs)
    } catch {
        sendMessage("blog has been deleted")
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
      <p>Logged in as {user.username}<button onClick={handleLogout} style={{marginLeft: 40}}>Log out</button></p>
      {createVisible && <BlogForm createBlog={((blog) => createBlog(blog))}/>}
      <button onClick={(() => setCreateVisible(!createVisible))}>{createVisible ? "Cancel": "Create blog"}</button>
      <Blogs blogs={blogs} deleteBlog={((id) => {deleteBlog(id)})} showBlog={((id) => {showBlog(id)})}/>
    </div>
  )
  }
}

export default App
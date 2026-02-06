import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({})

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blog)
    setBlog({})
  }

  const handleBlogChange = (target) => {
    const changedBlog = {}
    changedBlog.title = (target.id === "title") ? target.value: blog.title
    changedBlog.author = (target.id === "author") ? target.value: blog.author
    changedBlog.url = (target.id === "url") ? target.value: blog.url
    setBlog(changedBlog)
  }

  blog.title = blog.title ? blog.title: ""
  blog.author = blog.author ? blog.author: ""
  blog.url = blog.url ? blog.url: ""
  return (
    <form onSubmit={addBlog}>
      <p>
        <label>
          Title:
          <input id="title" value={ blog.title }
            onChange={({ target }) => handleBlogChange(target)}
            required style={{ marginLeft: 10 }}/>
        </label>
      </p>
      <p>
        <label>
          Author:
          <input id="author" value={ blog.author }
            onChange={({ target }) => handleBlogChange(target)}
            required style={{ marginLeft: 10 }}/>
        </label>
      </p>
      <p>
        <label>
          URL
          <input id="url" value={ blog.url }
            onChange={({ target }) => handleBlogChange(target)}
            required style={{ marginLeft: 10 }}/>
        </label>
      </p>
      <button type="Submit">Create Blog</button>
    </form>
  )
}

export default BlogForm
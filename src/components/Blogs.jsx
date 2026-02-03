const Blog = ({ blog, deleteBlog, showBlog }) => {

  const handleBlogDelete = async event => {
    event.preventDefault()
    deleteBlog(event.target.id)
  }
  const handleShowChange = event => {
    event.preventDefault()
    showBlog(event.target.id)
  }
  return (
    <div>
      <form>
        <h3>{blog.title} - {blog.author}
          <button id={blog.id.toString()} type="submit" onClick={handleShowChange}
            style={{marginLeft: 20}}>{blog.show ? "Hide": "Expand"}</button>
          <button id={blog.id.toString()} type="submit" onClick={handleBlogDelete}
            style={{marginLeft: 10}}>Delete</button>
          </h3>
        {blog.show && <div>
        <a href={blog.url}>{blog.url}</a>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.username}</p>
        
        </div>}
        
      </form>
    </div>  
)}

const Blogs = ({ blogs, deleteBlog, showBlog }) => (
    <div>
    <h1>blogs</h1>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} showBlog={showBlog}/>
      )}
    </div>
)

export default Blogs
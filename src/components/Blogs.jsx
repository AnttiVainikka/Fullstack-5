const Blog = ({ blog, handleSubmit }) => (
  <div>
    <form>
      <h3>{blog.title} <button id={blog.id.toString()} type="delete" onClick={handleSubmit}>Delete</button></h3>
      <p>author: {blog.author ? blog.author : blog.user.username}</p>
      <a href={blog.url}>{blog.url}</a>
    </form>
  </div>  
)

const Blogs = ({blogs, handleSubmit}) => (
    <div>
    <h1>blogs</h1>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleSubmit={handleSubmit} />
      )}
    </div>
  )

export default Blogs
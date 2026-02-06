const Blog = ({ blog, deleteBlog, showBlog, giveLike, user }) => {
  const handleBlogDelete = async event => {
    event.preventDefault()
    deleteBlog(event.target.id)
  }
  const handleShowChange = event => {
    event.preventDefault()
    showBlog(event.target.id)
  }
  const handleLikeChange = event => {
    event.preventDefault()
    giveLike(event.target.id)
  }
  return (
    <div>
      <form>
        <h3>{blog.title} - {blog.author}
          <button id={blog.id.toString()} type="submit" onClick={handleShowChange}
            style={{ marginLeft: 20 }}>{ blog.show ? "Hide": "Expand" }</button>
          {(user.username === blog.user.username) &&
          <button id={blog.id.toString()} type="submit" onClick={handleBlogDelete}
            style={{ marginLeft: 10 }}>Delete</button>}
        </h3>
        {blog.show && <div>
          <a href={ blog.url }>{ blog.url }</a>
          <p>likes { blog.likes } <button id={ blog.id.toString() } onClick={ handleLikeChange }>like</button></p>
          <p>{blog.user.username}</p>

        </div>}

      </form>
    </div>
  )}

export default Blog
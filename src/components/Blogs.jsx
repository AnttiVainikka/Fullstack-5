import Blog from "./Blog"

const Blogs = ({ blogs, deleteBlog, showBlog, giveLike, user }) => (
  <div>
    <h1>blogs</h1>
    {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
      <Blog key={ blog.id } blog={ blog } deleteBlog={ deleteBlog }
        showBlog={ showBlog } giveLike={ giveLike } user={ user } />
    )}
  </div>
)

export default Blogs
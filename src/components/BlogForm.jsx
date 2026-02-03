const BlogFrom = ({blog, handleBlogChange, handleSubmit}) => {
    blog.title = blog.title ? blog.title: ""
    blog.author = blog.author ? blog.author: ""
    blog.url = blog.url ? blog.url: ""
    return (
        <form onSubmit={handleSubmit}>
            <p>Title <input id="title" value={blog.title} onChange={handleBlogChange} required/></p>
            <p>Author <input id="author" value={blog.author} onChange={handleBlogChange}/></p>
            <p>URL <input id="url" value={blog.url} onChange={handleBlogChange} required/></p>
            <button type="Submit">Post</button>
        </form>
    )
}

export default BlogFrom
import {useState} from "react"

const BlogForm = ({createBlog}) => {
    const [blog, setBlog] = useState({})

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(blog)
        setBlog({})
    }

    const handleBlogChange = (target) => {
        const changedBlog = {}
        changedBlog.title = (target.id == "title") ? target.value: blog.title
        changedBlog.author = (target.id == "author") ? target.value: blog.author
        changedBlog.url = (target.id == "url") ? target.value: blog.url
        setBlog(changedBlog)
    }

    blog.title = blog.title ? blog.title: ""
    blog.author = blog.author ? blog.author: ""
    blog.url = blog.url ? blog.url: ""
    return (
        <form onSubmit={addBlog}>
            <p>Title <input id="title" value={blog.title} onChange={({ target }) => handleBlogChange(target)} required/></p>
            <p>Author <input id="author" value={blog.author} onChange={({ target }) => handleBlogChange(target)} required/></p>
            <p>URL <input id="url" value={blog.url} onChange={({ target }) => handleBlogChange(target)} required/> 
            <button type="Submit" style={{marginLeft: 40}}>Create Blog</button></p>   
        </form>
    )
}

export default BlogForm
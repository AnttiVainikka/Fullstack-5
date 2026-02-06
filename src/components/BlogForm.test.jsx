import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector("#title")
  const authorInput = container.querySelector("#author")
  const urlInput = container.querySelector("#url")
  const sendButton = screen.getByText('Create Blog')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'Testaaja Tessi')
  await user.type(urlInput, 'test.com')
  await user.click(sendButton)
  const correctCall = {
    title: 'testing a form...',
    author: 'Testaaja Tessi',
    url: 'test.com'
  }
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(correctCall)
})
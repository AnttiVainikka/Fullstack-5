import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  "title": "Yö ulkona",
  "author": "Jukka",
  "url": "twitter.com",
  "likes": 676,
  "user": {
    "username": "Boromir the Blogger",
    "name": "Boromir",
    "id": "697f49c50d595199d86f2ecf"
  },
  "id": "697f59dc18050c4589ce6362",
  "show": false
}

test('renders title and author but nothing else by default', () => {
  blog.show = false
  render(<Blog blog={blog} user={{ "username": "Boromir the Blogger" }}/>)

  screen.getByText('Yö ulkona - Jukka')
  let element = screen.queryByText('twitter.com')
  expect(element).toBeNull()
  element = screen.queryByText(676)
  expect(element).toBeNull()
  element = screen.queryByText('Boromir')
  expect(element).toBeNull()
})

test('renders everything when "Expand" is pressed', () => {
  blog.show = true
  render(<Blog blog={blog} user={{ "username": "Boromir" }}/>)

  screen.getByText('twitter.com')
  screen.getByText("likes 676")
  screen.getByText('Boromir the Blogger')
})

test("clicks to like button are registered", async () => {
  const mockHandler = vi.fn()
  blog.show = true
  render(<Blog blog={blog} user={{ "username": "Boromir" }} giveLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
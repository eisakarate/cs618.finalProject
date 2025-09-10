import { PostList } from './components/PostList.jsx'

//use static post list for now
const posts = [
  {
    title: 'Foo',
    contents: 'Bar',
    author: 'Foba',
  },
  {
    title: 'Foo2',
  },
]

export function App() {
  return <PostList posts={posts} />
}

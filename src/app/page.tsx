import PostList from "../ui/components/PostList/PostList";
import * as postRepository from '@/api/service/post.service';

export default async function Home() {
  const posts = await postRepository.obterTodos();
  return (
    <main>
      <PostList posts={posts}/>
    </main>
  )
}

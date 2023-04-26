import { PostCards } from '@/components/postcards';
import { GetAllPostsSortedByDate } from '@/lib/posts';

export default function Posts() {
  const posts = GetAllPostsSortedByDate();
  return (
    <>
      <h1 className="text-3xl">All posts</h1>
      <PostCards posts={posts} />
    </>
  );
}

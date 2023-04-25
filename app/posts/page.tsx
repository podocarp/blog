import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

type PostCardProps = {
  title: string,
  url: string,
};

function PostCard({ title, url }: PostCardProps) {
  return <a
    href={url}
    key={url}
  >
    {title}
  </a>;
}

export default function Posts() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  const postcards = posts.map(post => PostCard({ title: post.title, url: post.url })
  );
  return (
    <div className="p-24 flex flex-col items-center justify-between">
      <div className="w-full max-w-5xl font-mono lg:flex">
        <h1 className="text-xl">All posts</h1>
        {postcards}
      </div>
    </div>
  );
}

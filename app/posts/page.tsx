import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export default async function Posts() {
  const posts = await getData();
  const postcards = posts.map(post => {
    const { title, url } = post;
    return <>
      <p>{title}</p>
      <a>{url}</a>
    </>;
  });
  return (
    <div className="p-24 flex flex-col items-center justify-between">
      <div className="w-full max-w-5xl font-mono lg:flex">
        <h1 className="text-xl">All posts</h1>
        {postcards}
      </div>
    </div>
  );
}

async function getData() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return posts;
}

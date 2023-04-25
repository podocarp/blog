import { allPosts } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

type PostCardProps = {
  title: string,
  url: string,
  summary: string;
  date: string,
};

function PostCard({ title, url, summary, date }: PostCardProps) {
  return <div
    className="grid"
    key={url}
  >
    <a
      href={url}
      className="text-l md:text-xl font-mono w-fit"
    >
      {title}
    </a>
    <time dateTime={date} className="justify-self-end text-xs md:text-sm text-slate-500 absolute">
      {format(parseISO(date), 'LLLL d, yyyy')}
    </time>
    <p className="m-0 text-black text-sm md:text-base">
      {summary}
    </p>
  </div>;
}

export default function Posts() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  const postcards = posts.map(post => PostCard({
    title: post.title,
    url: post.url,
    summary: post.summary,
    date: post.date,
  })
  );
  return (
    <div className="prose mx-auto">
      <h1 className="text-3xl">All posts</h1>
      <div className="w-full grid gap-5">
        {postcards}
      </div>
    </div>
  );
}

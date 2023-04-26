import TimeTag from '@/components/timetag';
import { GetAllPostsSortedByDate } from '@/lib/posts';

type PostCardProps = {
  title: string,
  url: string,
  summary: string;
  date: string,
};

function PostCard({ title, url, summary, date }: PostCardProps) {
  return <div
    className="grid grid-cols-2 pb-4"
    key={url}
  >
    <a
      href={url}
      className="text-l md:text-xl font-mono w-fit"
    >
      {title}
    </a>
    <TimeTag date={date} />
    <p className="m-0 text-black text-sm md:text-base">
      {summary}
    </p>
  </div>;
}

export default function Posts() {
  const posts = GetAllPostsSortedByDate();
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

import { Post } from '@/.contentlayer/generated';
import TimeTag from '@/components/timetag';

type PostCardProps = {
  title: string,
  url: string,
  summary: string;
  date: string,
};

export function PostCard({ title, url, summary, date }: PostCardProps) {
  return <div
    className="grid grid-cols-1 md:grid-cols-3 pb-4"
    key={url}
  >
    <a
      href={url}
      className="text-l w-fit col-span-2"
    >
      {title}
    </a>
    <div className="md:justify-self-end">
      <TimeTag date={date} />
    </div>
    <p className="m-0 col-span-full text-justify">
      {summary}
    </p>
  </div>;
}

type PostCardsProps = {
  posts: Post[];
};

export function PostCards({ posts }: PostCardsProps) {
  const postcards = posts.map(post =>
    <PostCard
      title={post.title} url={post.url} summary={post.summary} date={post.date}
    />
  );

  return <div className="w-full grid gap-5">
    {postcards}
  </div>;
}

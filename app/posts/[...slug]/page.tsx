import Breadcrumbs from '@/components/breadcrumbs';
import TimeTag from '@/components/timetag';
import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

type Params = {
  slug: string[];
};

type PostProps = {
  params: Params;
};

export default function Post({ params }: PostProps) {
  const path = params.slug.join("/");
  const post = allPosts.find(post => post._raw.flattenedPath === path);
  if (!post) {
    throw Error("Post not found!");
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="container mx-auto">
      <Breadcrumbs paths={params.slug} base="posts" />
      <main className="prose text-black">
        <h1 className="py-4 m-0">{post.title}</h1>
        <TimeTag date={post.date} />
        <MDXContent components={{}} />
      </main>
    </div>
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  return allPosts.map(post => post._raw.flattenedPath.split("/"))
    .map(splitted => ({ slug: splitted }));
}

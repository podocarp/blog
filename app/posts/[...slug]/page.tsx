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
    <main className="prose mx-auto">
      <article className="text-black">
        <h1>{post.title}</h1>
        <MDXContent components={{}} />
      </article>
    </main>
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  return allPosts.map(post => post._raw.flattenedPath.split("/"))
    .map(splitted => ({ slug: splitted }));
}

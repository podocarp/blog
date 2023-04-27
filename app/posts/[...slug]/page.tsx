import Breadcrumbs from '@/components/breadcrumbs';
import mdxComponents from '@/components/mdx';
import { PostCards } from '@/components/postcards';
import TimeTag from '@/components/timetag';
import { FindPostByPath, FindPostsInCategory } from '@/lib/posts';
import { Post, allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

export function generateStaticParams(): Params[] {
  return allPosts.map(post => post._raw.flattenedPath.split("/"))
    .map(splitted => ({ slug: splitted }));
}

type Params = {
  slug: string[];
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps) {
  const path = params.slug.join("/");
  const post = FindPostByPath(path);
  if (!post) {
    throw Error("Post not found!");
  }

  return post.isIndexFile
    ? <Category slug={params.slug} post={post} />
    : <Post slug={params.slug} post={post} />;
}

type PostProps = {
  slug: string[];
  post: Post;
};

export function Post({ slug, post }: PostProps) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Breadcrumbs paths={slug} base="posts" currentPath={post.url} />
      <main className="prose text-black">
        <h1 className="py-4 m-0">{post.title}</h1>
        <TimeTag date={post.date} />
        <MDXContent components={mdxComponents} />
      </main>
    </>
  );
}

function Category({ slug, post }: PostProps) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Breadcrumbs paths={slug} base="posts" currentPath={post.url} />
      <main className="prose text-black">
        <h1 className="py-4 m-0">Category: {post.title}</h1>
        <MDXContent components={mdxComponents} />
        <hr />
        <p> All posts under this category: </p>
        <PostCards posts={FindPostsInCategory(slug)} />
      </main>
    </>
  );
}

import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { cache } from 'react';

export const GetAllPosts = cache(() => allPosts.filter(post => !post.disabled));

export const GetAllPostsSortedByDate = cache(
  () => GetAllPosts().sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
);

export const FindPostByPath = cache(
  (path: string) => {
    return GetAllPosts().find(post => post._raw.flattenedPath === path);
  }
);


export const FindPostsInCategory = cache(
  (slug: string[]) => {
    const path = slug.join("/");
    return GetAllPosts().filter(post =>
      post._raw.sourceFileDir === path && !post.isIndexFile);
  }
);

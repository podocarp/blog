import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { cache } from 'react';

const GetAllPosts = cache(() => allPosts.filter(post => !post.disabled));

/** Returns all non hidden files sorted by date.
 */
export const GetAllPostsSortedByDate = cache(
  () => GetAllPosts()
    .filter(post => !post.hidden)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
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

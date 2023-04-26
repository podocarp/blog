import { Post, allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { cache } from 'react';

export const GetAllPostsSortedByDate = cache(() =>
  allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
);

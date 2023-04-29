import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'The summary of the post',
      required: true,
    },
    disabled: {
      type: 'boolean',
      description: 'If true, post will be disabled (inaccessible).',
      required: false,
      default: false,
    },
    hidden: {
      type: 'boolean',
      description: 'If true, post will be hidden from all posts page but still available through for example a hyperlink.',
      required: false,
      default: false,
    },
    prev: {
      type: 'string',
      description: 'Relative link to previous post. If present, will display links to it at the top and bottom of the page.',
      required: false,
    },
    next: {
      type: 'string',
      description: 'Relative link to next post. If present, will display links to it at the top and bottom of the page.',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/posts/${post._raw.flattenedPath}`,
    },
    isIndexFile: {
      type: 'boolean',
      resolve: post => post._raw.sourceFileName.includes("index"),
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
});

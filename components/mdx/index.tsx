import { MDXComponents } from "mdx/types";
import EmbedPdf from "./embedpdf";
import Figure from "./figure";
import Gallery from "./gallery/gallery";
import Code from "./code";


export const mdxComponents: MDXComponents = {
  EmbedPdf,
  Figure,
  Gallery,
  code: Code,
}


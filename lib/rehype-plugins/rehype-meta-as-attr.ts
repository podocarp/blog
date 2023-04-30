import { visit } from "unist-util-visit";
import type { Plugin, Transformer } from "unified";
import type { Root } from "hast";
import rangeParser from "parse-numeric-range";

export const rehypeMetaAsAttributes: Plugin<void[], Root> = () => {
  const transformer: Transformer<Root, Root> = (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code" && node.data && node.data.meta) {
        if (typeof node.data.meta !== "string") {
          return;
        }
        const parsedMeta = metaParser(node.data.meta);
        parsedMeta.forEach((v, k) => {
          if (!k) {
            return;
          }
          if (!node.properties) {
            node.properties = {};
          }
          node.properties[k] = v ?? " ";
          k;
        });
      }
    });
  };

  return transformer;
};

type MetaType = Map<string | undefined, string | number[] | undefined>;

// Parses the meta part of the code tags. This very much expects well behaved
// inputs, it is not robust enough to handle funny or invalid syntax.
function metaParser(meta: string): MetaType {
  const res: MetaType = new Map();
  meta.split(" ").forEach((phrase) => {
    let [key, value] = phrase.split("=");

    switch (key) {
      case "user":
      case "root":
        if (!value) {
          res.set(key, []);
        } else {
          const range = rangeParser(value);
          res.set(key, range);
        }
        break;

      default:
        res.set(key, value);
        break;
    }
  });
  return res;
}

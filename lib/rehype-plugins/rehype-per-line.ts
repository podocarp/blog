import { visit } from "unist-util-visit";
import type { Plugin, Transformer } from "unified";
import type { Root, ElementContent } from "hast";

// This plugin splits the ast into lines and does things to every line.
export const rehypePerLine: Plugin<void[], Root> = () => {
  const transformer: Transformer<Root, Root> = (tree: Root) => {
    visit(tree, "element", (node, _, parent) => {
      if (
        node.tagName === "code" &&
        parent?.type === "element" &&
        parent.tagName === "pre"
      ) {
        let children = splitTextByLines(node.children);
        if (node.properties) {
          if (node.properties["user"]) {
            const range = node.properties["user"] as number[];
            children = insertLeftSideSpan("user", range, children);
          }
          if (node.properties["root"]) {
            const range = node.properties["root"] as number[];
            children = insertLeftSideSpan("root", range, children);
          }
          if (node.properties["linenumbers"] || node.properties["lineno"]) {
            children = insertLineNumbers(children);
          }
        }

        node.children = children;
      }
    });
  };

  return transformer;
};

type EleContentWithLineNumber = ElementContent & { lineNumber?: number; };

function insertLineNumbers(
  nodes: EleContentWithLineNumber[]
): ElementContent[] {
  return nodes.map((node) => {
    const lineNumberSpan: ElementContent = {
      type: "element",
      tagName: "span",
      children: [
        {
          type: "text",
          value: `${node.lineNumber}`,
        },
      ],
      properties: {
        className: "gutter",
      },
    };

    return _addToChildren(node, lineNumberSpan);
  });
}

// Inserts the ~$ or ~# thing on the left of code blocks depending on `type`.
// If `range` is empty, adds it to every line. Otherwise, only adds it to the
// lines specified in `range`.
function insertLeftSideSpan(
  type: "user" | "root",
  range: number[],
  nodes: EleContentWithLineNumber[]
): ElementContent[] {
  const linesToHighlight = new Set(range);
  return nodes.map((node) => {
    const shouldAddSpan =
      range.length === 0 ||
      (node.lineNumber && linesToHighlight.has(node.lineNumber));
    const spanElement: ElementContent = {
      type: "element",
      tagName: "span",
      children: [
        {
          type: "text",
          value: shouldAddSpan ? (type === "user" ? "~$" : "~#") : "",
        },
      ],
      properties: {
        className: shouldAddSpan
          ? type === "user"
            ? "gutter bash-user-sign"
            : "gutter bash-root-sign"
          : "gutter",
        style: "width: 3ch",
        title: type === "user" ? "Execute as user" : "Execute as root",
      },
    };

    return _addToChildren(node, spanElement);
  });
}

function _addToChildren(
  node: ElementContent,
  element: ElementContent
): ElementContent {
  if (node.type === "text") {
    return {
      type: "element",
      tagName: "span",
      children: [element, node],
    };
  }
  if (node.type === "element") {
    node.children = [element, ...node.children];
    return node;
  }

  return node;
}

function splitTextByLines(tree: ElementContent[]) {
  try {
    return _coalesceLines(_splitTextByLineHelper(tree, 1));
  } catch (e) {
    console.error(e);
    console.log(tree);
    return tree;
  }
}

function _coalesceLines(
  tree: EleContentWithLineNumber[]
): EleContentWithLineNumber[] {
  const allLineNumbers = Array.from(
    new Set(tree.map((x) => x.lineNumber as number))
  );
  let i = 0;
  return allLineNumbers.reduce(
    (result: EleContentWithLineNumber[], lineNum) => {
      const children = [];
      for (; i < tree.length; i++) {
        const element = tree[i];
        if (!element.lineNumber) {
          console.error("no line number", element);
          continue;
        }

        if (element.lineNumber < lineNum) {
          result.push(element);
        } else if (element.lineNumber === lineNum) {
          children.push(element);
        } else {
          break;
        }
      }

      result.push({
        type: "element",
        tagName: "div",
        children: children,
        lineNumber: lineNum,
      });
      return result;
    },
    []
  );
}

function _splitTextByLineHelper(
  children: EleContentWithLineNumber[],
  lineNum: number
): EleContentWithLineNumber[] {
  return children.reduce((result: EleContentWithLineNumber[], node) => {
    if (node.type === "text") {
      if (!node.value.includes("\n")) {
        node.lineNumber = lineNum;
        result.push(node);
        return result;
      }

      node.value.split(/(?<=\n)/).forEach((line, i, lines) => {
        // not sure why, it's just junk
        if (i !== 0) lineNum++;

        result.push({
          type: "text",
          value: line,
          position: node.position
            ? {
              start: {
                line: node.position.start.line + i,
                column: node.position.start.column,
              },
              end: {
                line: node.position.end.line + i,
                column: node.position.end.column,
              },
            }
            : undefined,
          lineNumber: lineNum,
        });

        // For lines ending with newlines. These might get skipped by the
        // first check. We don't want to increment lineNum before the push
        // because that would increment the pushed line, we want to increment
        // the next line's number (because of the newline)
        if (lines.length === 1 && line.search("\n") === line.length - 1)
          lineNum++;
      });
      return result;
    }

    if (node.type === "element") {
      const splitted = _splitTextByLineHelper(node.children, lineNum);
      node.children = splitted;
      if (splitted.length < 1) {
        node.lineNumber = lineNum;
      } else {
        node.lineNumber = splitted[0].lineNumber;
      }
      result.push(node);
      return result;
    }

    result.push(node);
    return result;
  }, []);
}

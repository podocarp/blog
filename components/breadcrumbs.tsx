import { FindPostByPath } from "@/lib/posts";
import { Fragment } from "react";

type BreadcrumbProps = {
  /** Array of all paths to create breadcrumbs for.
   */
  paths: string[];
  /** The base path for all the breadcrumbs, appears before anything in `paths`*/
  base: string;
  /** The current path we are at. */
  currentPath: string;
};

/**
 * @param {BreadcrumbProps} props
 */
export default function Breadcrumbs({ paths, base, currentPath }: BreadcrumbProps) {
  const crumbs = paths
    .reduce((acc, curr) => {
      let previousUrl = "";
      if (acc.length > 0) {
        previousUrl = acc[acc.length - 1].url;
      }
      acc.push({
        url: previousUrl ? `${previousUrl}/${curr}` : curr,
        name: curr,
      });
      return acc;
    }, [{ url: "", name: base }])
    .map(({ url, name }) => {
      const isEnabled =
        (url !== currentPath && FindPostByPath(url)) ||
        name === base;
      return <Fragment key={url}>/
        {isEnabled
          ? <a
            href={`/${base}/${url}`}
            className="max-w-fit underline"
          >
            {name}
          </a>
          : <span>{name}</span>
        }
      </Fragment>;
    });

  return <div className="flex flex-row space-x-0 font-mono">{crumbs}</div>;
}

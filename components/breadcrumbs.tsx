import { FindPostByPath } from "@/lib/posts";
import { join } from "path";
import { Fragment } from "react";

type BreadcrumbProps = {
  /** Array of all paths to create breadcrumbs for.
   */
  crumbs: string[];
  /** The base path for all the breadcrumbs, appears before anything in `paths`*/
  base: string;
  /** The current path we are at. */
  currentUrl: string;
};

/**
 * @param {BreadcrumbProps} props
 */
export default function Breadcrumbs({ crumbs, base, currentUrl }: BreadcrumbProps) {
  const elements = crumbs
    .reduce((acc, crumb) => {
      const previousUrl = acc[acc.length - 1].url;
      const previousPath = acc[acc.length - 1].path;
      acc.push({
        url: `${previousUrl}/${crumb}`,
        path: join(previousPath, crumb),
        name: crumb,
      });
      return acc;
    }, [{ url: `/${base}`, path: "", name: base }])
    .map(({ url, path, name }) => {
      const isEnabled =
        (url !== currentUrl && FindPostByPath(path)) ||
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

  return <div className="flex flex-row space-x-0 font-mono">{elements}</div>;
}

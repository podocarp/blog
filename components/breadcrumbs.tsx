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
        url: `${previousUrl}/${curr}`,
        name: curr,
      });
      return acc;
    }, [{ url: `/${base}`, name: base }])
    .map(({ url, name }) => (
      <>/
        {url !== currentPath
          ? <a
            href={url}
            className="max-w-fit underline"
          >
            {name}
          </a>
          : <span>{name}</span>
        }
      </>
    ));

  return <div
    className="flex flex-row space-x-0 font-mono"
  >{crumbs}</div>;
}

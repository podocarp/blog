type BreadcrumbProps = {
  paths: string[];
  base: string;
};

type BreadcrumbObject = {
  url: string;
  name: string;
};

/**
 * Takes in `paths`, an array of all paths to generate breadcrumbs for, and
 * `base`, which is the first breadcrumb and also makes up the base url.
 * @param param0 
 */
export default function Breadcrumbs({ paths, base }: BreadcrumbProps) {
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
        <a
          href={url}
          className="max-w-fit underline font-mono"
        >
          {name}
        </a>
      </>
    ));


  return <div
    className="flex flex-row space-x-0"
  >{crumbs}</div>;
}

import { readdir } from "fs/promises";
import Image from "next/image";
import { join } from "path";

type GalleryProps = {
  /** relative path to the folder path */
  dir: string;
  captions: string[];
};

export default async function Gallery({ dir, captions }: GalleryProps) {
  const fullPath = join("public", dir);
  const items: JSX.Element[] = [];
  await readdir(fullPath, { withFileTypes: true })
    .then(files => {
      files.forEach((file, i) => {
        const fullImgPath = join("/", dir, file.name);
        items.push(<GalleryItems
          path={fullImgPath}
          caption={captions && i < captions.length ? captions[i] : undefined}
        />);
      });
    });

  return (
    <div
      className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3"
    >
      {items}
    </div>
  );
}

type GalleryItemsProps = {
  /** full path to the image */
  path: string;
  caption?: string;
};

function GalleryItems({ path, caption }: GalleryItemsProps) {
  return <figure
    className="group items-center aspect-w-1 aspect-h-1"
    key={path}
  >
    <Image
      alt="image"
      src={path}
      className="group-hover:opacity-75 duration-700 ease-in-out w-full object-cover m-0"
      fill
    />
    {caption ? (
      <figcaption>
        <p>{caption}</p>
      </figcaption>
    ) : (
      <></>
    )}
  </figure>;
}

import { readdirSync } from "fs";
import { join } from "path";
import GalleryItems from "./gallery-item";
import imageSize from "image-size";

type GalleryProps = {
  /** relative path to the folder path */
  dir: string;
};

export default function Gallery({ dir }: GalleryProps) {
  const fullPath = join("public", dir);
  const files = readdirSync(fullPath, { withFileTypes: true });
  const items = files.map(file => {
    const imgPath = join(fullPath, file.name);
    const size = imageSize(imgPath);
    const imgUrl = join("/", dir, file.name);
    return <GalleryItems
      path={imgUrl}
      key={imgUrl}
      height={size.height || 0}
      width={size.width || 0}
    />;
  });

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 py-4"
    >
      {items}
    </div>
  );
}


import Image from "next/image";
import imageSize from "image-size";
import { join } from "path";

export type FigureProps = {
  src: string;
  caption?: string;
  wrap?: "left" | "right" | boolean;
};

export default function Figure(props: FigureProps) {
  const imgPath = join("public", props.src);
  const size = imageSize(imgPath);

  return (
    <figure className={`table p-4 content-center m-auto float-${props.wrap}`}>
      <Image
        {...props}
        alt={"figure"}
        width={size.width}
        height={size.height}
      />
      {props.caption ? (
        <figcaption className="table-caption caption-bottom text-center p-0 m-0">
          <p>{props.caption}</p>
        </figcaption>
      ) : (
        <></>
      )}
    </figure>
  );
}

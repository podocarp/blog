"use client";
import Image from "next/image";
import { Fragment, useState } from "react";

type GalleryItemsProps = {
  /** full path to the image */
  path: string;
  height: number;
  width: number;
};

export default function GalleryItems({ path, height, width }: GalleryItemsProps) {
  const [active, setActive] = useState(false);

  return <Fragment key={path}>
    <figure
      className="z-1 aspect-w-1 aspect-h-1 m-0"
      onClick={() => setActive(true)}
    >
      <Image
        alt="image"
        src={path}
        className="object-cover"
        fill
        sizes="30vw"
      />
    </figure>
    <div
      className={active ? "contents" : "hidden"}
    >
      <div
        className="z-10 fixed top-0 left-0 w-screen h-screen bg-black/90"
        onClick={() => setActive(false)}
      >
      </div>
      <figure
        id="modal"
        className="z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0animate-fadein"
        onClick={() => setActive(true)}
      >
        <Image
          alt="image"
          src={path}
          className="z-20 object-fill p-auto animate-fadein"
          width={width}
          height={height}
        />
      </figure >
    </div>
  </Fragment>;
}

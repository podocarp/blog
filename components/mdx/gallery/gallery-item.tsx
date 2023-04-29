"use client";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";

type GalleryItemsProps = {
  /** full path to the image */
  path: string;
  height: number;
  width: number;
};

export default function GalleryItems({ path, height, width }: GalleryItemsProps) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const screenHeight = document.documentElement.clientHeight;
  const screenWidth = document.documentElement.clientWidth;
  const aspectRatio = width / height;

  let displayedWidth = width;
  let displayedHeight = height;

  // width is larger than height, try to maximize width
  if (aspectRatio > 1) {
    displayedWidth = screenWidth * 0.8;
    displayedHeight = displayedWidth / aspectRatio;
  } else {
    displayedHeight = screenHeight * 0.8;
    displayedWidth = displayedHeight * aspectRatio;
  }

  const picture = <figure
    className="z-1 aspect-w-1 aspect-h-1 m-0"
    onClick={() => setActive(true)}
    ref={ref}
  >
    <Image
      alt="image"
      src={path}
      className="object-cover"
      fill
    />
  </figure>;

  const modal = <div className={active ? "contents" : "hidden"}>
    <div
      className="z-10 fixed top-0 left-0 w-screen h-screen bg-black/90"
      onClick={() => setActive(false)}
    >
    </div>
    <figure
      id="modal"
      className="z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0animate-fadein"
      style={{ height: displayedHeight, width: displayedWidth }}
      onClick={() => setActive(true)}
      ref={ref}
    >
      <Image
        alt="image"
        src={path}
        className="z-20 object-cover m-auto p-auto animate-fadein"
        fill
      />
    </figure >
  </div>;

  return <Fragment key={path}>
    {picture} {modal}
  </Fragment>;
}

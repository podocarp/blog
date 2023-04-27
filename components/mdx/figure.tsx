import Image from "next/image";

export type FigureProps = {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  wrap?: "left" | "right" | boolean;
};

export default function Figure(props: FigureProps) {

  return (
    <figure className="">
      <Image
        {...props}
        alt={props.alt ?? "image"}
        width={props.width ?? 256}
        height={props.height ?? 256}
      />
      {props.caption ? (
        <figcaption>
          <p>{props.caption}</p>
        </figcaption>
      ) : (
        <></>
      )}
    </figure>
  );
}

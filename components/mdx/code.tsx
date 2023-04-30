import { DocumentIcon } from "@heroicons/react/24/outline";

type CodeProps = {
  path?: string;
  className?: string;
  root?: string;
};

export default function Code(props: React.PropsWithChildren<CodeProps>) {
  return (
    <>
      {props.path ? (
        <div
          className="text-white font-bold flex items-center text-center"
          title="filename"
        >
          <DocumentIcon className="h-4 pb-0.5 mr-1" />
          {props.path}
        </div>
      ) : (
        <></>
      )}
      <code {...props}>{props.children}</code>
    </>
  );
}

import { Head } from "next/document";
import "./style.css";
import "../../public/katex/katex.min.css";

export default function PostsLayout({ children }: React.PropsWithChildren) {
  return <div className="container mb-10">
    <div className="prose mx-auto">
      {children}
    </div>
  </div>;
}

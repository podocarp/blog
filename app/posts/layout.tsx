export default function PostsLayout({ children }: React.PropsWithChildren) {
  return <div className="container mb-10">
    <div className="prose mx-auto">
      {children}
    </div>
  </div>;
}

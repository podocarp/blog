export default function PostsLayout({ children }: React.PropsWithChildren) {
  return <div className="container" >
    <div className="prose mx-auto">
      {children}
    </div>
  </div>;
}

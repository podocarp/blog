export default function NavBar() {
  return <nav
    className="flex justify-center md:justify-start mb-10 space-x-4"
  >
    {[
      ['Home', '/'],
      ['Posts', '/posts'],
    ].map(([title, url]) => (
      <a
        href={url}
        key={url}
        className="p-2 text-black font-medium hover:bg-slate-100 hover:text-slate-900"
      >{title}</a>
    ))}
  </nav>;
}

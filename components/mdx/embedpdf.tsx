type EmbedPdfProps = {
  src: string;
};

export default function EmbedPdf({ src }: EmbedPdfProps) {
  return <object data={src} type="application/pdf" className="w-full h-screen">
    <p>Unable to display PDF directly. <a href={src}>Download</a>.</p>
  </object>;
}

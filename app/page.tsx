import Image from 'next/image';
import background from '../public/background.jpg';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full font-mono lg:flex">
        <h1 className="text-xl pb-4">Hello world</h1>
      </div>
      <Image
        src={background}
        alt="background picture"
        height={300}
        className="grayscale hover:grayscale-0 p-0 sm:p-16"
      />
      <a
        href="/posts"
        className="group rounded-lg border border-transparent px-4 py-4 hover:bg-gray-100"
        rel="noopener noreferrer"
      >
        <h2 className={`text-2xl font-semibold`}>
          Stuff{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        </p>
      </a>
    </main>
  );
}

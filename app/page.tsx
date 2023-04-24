import Image from 'next/image';
import { Inter } from 'next/font/google';
import background from '../public/background.jpg';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex flex-col max-h-screen min-h-screen items-center justify-between p-24">
      <div className="w-full max-w-5xl font-mono lg:flex">
        <h1 className="text-xl">Hello world</h1>
      </div>
      <Image
        src={background}
        alt="background picture"
        height={300}
        className="grayscale hover:grayscale-0"
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

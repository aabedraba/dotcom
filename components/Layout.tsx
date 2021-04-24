import { FC } from "react";
import Head from "next/head";
import Link from "next/link";

export const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col max-w-lg mx-auto h-screen justify-between">
      <Head>
        <title>Abdallah Abedraba</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="flex flex-col space-y-2">
        <Link href="/">
          <a className="text-xl font-medium">aabedraba.com</a>
        </Link>
        <div className="space-x-2">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/social">
            <a>Social</a>
          </Link>
          <a href="resume.pdf">Resume</a>
        </div>
      </header>
      <main className="py-10 mb-auto">{children}</main>
      <footer className="text-left">
        <span>Made with {"<"}3</span>
      </footer>
    </div>
  );
};

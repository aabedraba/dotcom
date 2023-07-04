import Head from "next/head";
import { Header } from "./Header";

export const Layout = ({ children }: {
  children: React.ReactNode;
}) => {

  return (
    <div className="flex flex-col p-3 max-w-2xl mx-auto h-screen justify-between">
      <Head>
        <title>Abdallah Abedraba</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div
        style={{
          minHeight: "90px",
        }}
        className="absolute top-0 inset-x-0 shadow-sm z-0"
      />
      <Header />
      <main className="py-10 mb-auto">{children}</main>
      <footer className="flex flex-col text-left text-gray-700">
        <span>Escape your randomness</span>
        <span>With {"<"}3</span>
      </footer>
    </div>
  );
};

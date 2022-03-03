import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const Logo = () => (
  <svg
    id="prefix__Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
    className="inline"
    style={{
      maxWidth: "40px",
      maxHeight: "40px",
    }}
  >
    <defs>
      <style>{".prefix__cls-1{fill:#0f0e05}"}</style>
    </defs>
    <path d="M476.36 623.88q-23.25 0-41.78-8.35a67.15 67.15 0 01-29.29-24.76q-10.76-16.38-10.75-40.43 0-20.69 7.64-34.22A59.23 59.23 0 01423 494.47a106.77 106.77 0 0129.85-12.34 248.44 248.44 0 0134.5-6.13q21.48-2.22 34.86-4.06t19.5-5.73q6.12-3.9 6.13-12.17v-1q0-18-10.67-27.86t-30.72-9.87q-21.18 0-33.51 9.23t-16.63 21.81l-53.81-7.64q6.36-22.28 21-37.33a92.8 92.8 0 0135.82-22.6q21.17-7.56 46.8-7.56a152.45 152.45 0 0135.18 4.14 99.82 99.82 0 0132 13.61 70 70 0 0123.33 25.7q8.83 16.25 8.83 40.6V619h-55.39v-33.64h-1.92a69.48 69.48 0 01-14.72 19 70.37 70.37 0 01-23.72 14.16q-14.25 5.37-33.35 5.36zm15-42.34q17.34 0 30.08-6.92a50.7 50.7 0 0019.66-18.39 47.41 47.41 0 006.93-25v-28.8c-1.81 1.49-4.86 2.86-9.16 4.14a137.78 137.78 0 01-14.4 3.34q-8 1.43-15.76 2.55t-13.53 1.9a101.2 101.2 0 00-23.08 5.74 38.59 38.59 0 00-16.1 11.06q-5.89 7.08-5.89 18.23 0 15.92 11.62 24t29.6 8.15z" />
    <path
      className="prefix__cls-1"
      d="M769 764.09H231.05v-537.9H769zm-517.37-20.58h496.74V246.77H251.63z"
    />
    <path
      className="prefix__cls-1"
      d="M500 880.36L119.64 500 500 119.64 880.36 500zM148.75 500L500 851.24 851.25 500 500 148.76z"
    />
  </svg>
);

const routes = [
  { urlDestination: "/", text: "Blog" },
  { urlDestination: "/about", text: "About me" },
  { urlDestination: "resume.pdf", text: "Résume" },
  { urlDestination: "/social", text: "Social" },
];

export const Layout: FC = ({ children }) => {
  const router = useRouter();

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
      <header className="flex flex-col space-y-1 z-10">
        <Link href="/">
          <a className="text-xl font-bold text-black">
            aabedraba.com
            <Logo />
          </a>
        </Link>
        <nav className="space-x-8">
          {routes.map((route) => {
            if (router.pathname === route.urlDestination) {
              return (
                <Link href={route.urlDestination}>
                  <a className="text-gray-800 font-semibold ">{route.text}</a>
                </Link>
              );
            }

            return (
              <Link href={route.urlDestination}>
                <a className="text-gray-800">{route.text}</a>
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="py-10 mb-auto">{children}</main>
      <footer className="flex flex-col text-left text-gray-700">
        <span>Escape your randomness</span>
        <span>With {"<"}3</span>
      </footer>
    </div>
  );
};

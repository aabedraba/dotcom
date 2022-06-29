/** @jsx h */
import { h, ComponentChildren } from "preact";
import { tw } from "twind";

const Logo = () => (
  <img
    src="/logo.svg"
    className="inline"
    style={{
      maxWidth: "40px",
      maxHeight: "40px",
    }}
  />
);

const routes = [
  { urlDestination: "/", text: "Blog" },
  { urlDestination: "/about", text: "About me" },
  { urlDestination: "resume.pdf", text: "Résume" },
  { urlDestination: "/social", text: "Social" },
];

export const Layout = ({
  children,
  url,
}: {
  children: ComponentChildren;
  url: URL;
}) => {
  return (
    <div
      className={tw`flex flex-col p-3 max-w-2xl mx-auto h-screen justify-between`}
    >
      <head>
        <title>Abdallah Abedraba</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <div
        style={{
          minHeight: "90px",
        }}
        className={tw`absolute top-0 inset-x-0 shadow-sm z-0`}
      />
      <header className={tw`flex flex-col space-y-1 z-10`}>
        <a href="/" className={tw`flex text-xl font-bold text-black`}>
          aabedraba.com
          <Logo />
        </a>
        <nav className={tw`space-x-8`}>
          {routes.map((route) => {
            if (url.pathname === route.urlDestination) {
              return (
                <a
                  href={route.urlDestination}
                  key={route.urlDestination}
                  className={tw`text-gray-800 font-semibold`}
                >
                  {route.text}
                </a>
              );
            }

            return (
              <a
                href={route.urlDestination}
                key={route.urlDestination}
                className={tw`text-gray-800`}
              >
                {route.text}
              </a>
            );
          })}
        </nav>
      </header>
      <main className={tw`py-10 mb-auto`}>{children}</main>
      <footer className={tw`flex flex-col text-left text-gray-700`}>
        <span>Escape your randomness</span>
        <span>With {"<"}3</span>
      </footer>
    </div>
  );
};

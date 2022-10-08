import { ComponentChildren } from "preact";

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
    <div className="flex flex-col p-3 max-w-2xl mx-auto h-screen justify-between">
      <div
        style={{
          minHeight: "90px",
        }}
        className="absolute top-0 inset-x-0 shadow-sm z-0"
      />
      <header className="flex flex-col space-y-1 z-10">
        <a href="/" className="flex text-xl font-bold text-black">
          aabedraba.com
          <Logo />
        </a>
        <nav className="space-x-8">
          {routes.map((route) => {
            if (url.pathname === route.urlDestination) {
              return (
                <a
                  href={route.urlDestination}
                  key={route.urlDestination}
                  className="text-gray-800 font-semibold"
                >
                  {route.text}
                </a>
              );
            }

            return (
              <a
                href={route.urlDestination}
                key={route.urlDestination}
                className="text-gray-800"
              >
                {route.text}
              </a>
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

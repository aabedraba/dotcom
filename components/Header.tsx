import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-black text-xl	py-2 text-center shadow-lg text-white">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </div>
  );
};

import Link from "next/link";
import { getBlogposts } from "../lib/blogposts";
import { CurrentSong, LoadingLastPlayedSong } from "./current-song";
import { Suspense } from "react";

const Index = async () => {
  const postList = getBlogposts();

  return (
    <div className="space-y-7">
      <Suspense fallback={<LoadingLastPlayedSong />}>
        <CurrentSong />
      </Suspense>

      <ul className="space-y-5">
        {postList.map((post) => {
          return (
            <li key={post.title} className="flex">
              <span className="block pr-10 text-gray-700">
                {new Date(post.date).toISOString().split("T")[0]}
              </span>
              <div className="flex flex-col">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>

                <div className="flex">
                  {post.tags.map((tag) => {
                    return <p className="text-sm text-gray-500 mr-2">#{tag}</p>;
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Index;

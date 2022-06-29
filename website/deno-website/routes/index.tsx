/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import type { PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import { Layout } from "../components/Layout.tsx";

// type PageProps = {
//   postList:BlogPostDetails[];
// };

type BlogPostDetails = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

const LoadingLastPlayedSong = () => {
  return (
    <div className="animate-pulse space-y-4 mt-1">
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-40 h-3 bg-gray-200 rounded"></div>
    </div>
  );
};

const Index = (props: PageProps) => {
  const postList: BlogPostDetails[] = [
    {
      date: new Date().toISOString(),
      slug: "new-post",
      tags: ["new"],
      title: "New post!",
    },
  ];
  const [songDetails, setSongDetails] = useState<{
    title: string;
    artists: string;
    songUrl: string;
    lastPlayed: Date;
  } | null>(null);

  useEffect(() => {
    async function getCurrentSongDetails() {
      const request = await fetch("https://aabedraba-spotify-auth.deno.dev");

      if (request.status === 401) {
        return;
      }

      const json = await request.json();

      setSongDetails({
        title: json.track.name,
        artists: json.track.artists
          .map((artist: { name: string }) => artist.name)
          .join(", "),
        songUrl: json.track.external_urls.spotify,
        lastPlayed: new Date(json.played_at),
      });
    }

    // getCurrentSongDetails();
  }, []);

  dayjs.extend(relativetime);

  return (
    <Layout url={props.url}>
      <div className={tw`space-y-7`}>
        <div>
          <span className={tw`text-gray-900`}>
            Recently played on my Spotify
          </span>
          {songDetails ? (
            <div className={tw`flex flex-col`}>
              <span>
                <a href={songDetails.songUrl}>
                  {songDetails.title}
                  <p>
                    by <span className={tw`italic`}>{songDetails.artists}</span>
                  </p>
                </a>
                <p className={tw`text-gray-900`}>
                  {(dayjs(songDetails.lastPlayed) as any).fromNow()}
                </p>
              </span>
            </div>
          ) : (
            <LoadingLastPlayedSong />
          )}
        </div>

        <ul className={tw`space-y-5`}>
          {postList.map((post) => {
            return (
              <li key={post.title} className={tw`flex`}>
                <span className={tw`block pr-10 text-gray-700`}>
                  {new Date(post.date).toISOString().split("T")[0]}
                </span>
                <div className={tw`flex flex-col`}>
                  <a href={`/posts/${post.slug}`}>{post.title}</a>

                  <div>
                    {post.tags.map((tag) => {
                      return (
                        <a
                          href={`/tags/${tag}`}
                          key={tag}
                          className={tw`text-sm text-gray-500 mr-2`}
                        >
                          #{tag}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Index;

import { Layout } from "../components/Layout";
import fs from "fs";
import matter from "gray-matter";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type PageProps = {
  postList: {
    slug: string;
    title: string;
    date: string;
  }[];
};

const Index = ({ postList }: PageProps) => {
  const [songDetails, setSongDetails] = useState<{
    title: string;
    artists: string;
    songUrl: string;
    lastPlayed: Date;
  } | null>(null);

  useEffect(() => {
    async function getCurrentSongDetails() {
      const request = await fetch("api/spotify-auth");

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

    getCurrentSongDetails();
  }, []);

  dayjs.extend(relativeTime);

  return (
    <Layout>
      <div className="space-y-10">
        {songDetails && (
          <div className="flex flex-col">
            <span className="text-gray-900">
              {" "}
              Recently played on my Spotify
            </span>
            <span>
              <a href={songDetails.songUrl}>
                {songDetails.title}
                <p>
                  by <span className="italic">{songDetails.artists}</span>
                </p>
              </a>
              <p className="text-gray-900">
                {dayjs(songDetails.lastPlayed).fromNow()}
              </p>
            </span>
          </div>
        )}
        <ul className="space-y-7">
          {postList.map((post) => {
            return (
              <li key={post.title} className="flex">
                <span className="block pr-10 text-gray-700">
                  {new Date(post.date).toISOString().split("T")[0]}
                </span>
                <Link
                  href={{
                    pathname: "/posts/[slug]",
                    query: {
                      slug: post.slug,
                    },
                  }}
                >
                  <a>{post.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetServerSideProps<PageProps> = async () => {
  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);

  const postList = fileNames.map((fileName) => {
    const filePath = path + fileName;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const result = matter(fileContent);
    return {
      slug: fileName.replace(".md", "").trim(),
      title: result.data.title,
      date: result.data.date,
    };
  });

  return {
    props: {
      postList: postList.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate < bDate ? 1 : -1;
      }),
    },
  };
};

export default Index;

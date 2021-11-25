import { Layout } from "../components/Layout";
import fs from "fs";
import matter from "gray-matter";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

type PageProps = {
  postList: {
    slug: string;
    title: string;
    date: string;
  }[];
  spotifyAuth: string | null;
};

const Index = ({ postList, spotifyAuth }: PageProps) => {
  const [songDetails, setSongDetails] = useState<{
    title: string;
    artists: string;
    songUrl: string;
  } | null>(null);

  useEffect(() => {
    async function getCurrentSongDetails() {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${spotifyAuth}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      const lastSong = json.items[0];

      setSongDetails({
        title: lastSong.track.name,
        artists: lastSong.track.artists
          .map((artist: { name: string }) => artist.name)
          .join(", "),
        songUrl: lastSong.track.external_urls.spotify,
      });
    }

    getCurrentSongDetails();
  }, []);

  return (
    <Layout>
      <ul className="space-y-7">
        {postList.map((post) => {
          return (
            <li key={post.title} className="flex">
              <span className="block pr-10 text-gray-700">{post.date}</span>
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
      {songDetails && (
        <div className="mt-10">
          <span className="text-gray-900"> Recently played song</span>
          <p>
            <a href={songDetails.songUrl}>
              {songDetails.title}
              <p>
                by <span className="italic">{songDetails.artists}</span>
              </p>
            </a>
          </p>
        </div>
      )}
    </Layout>
  );
};

const getSpotifyAuthToken = async (
  clientId: string | null,
  clientSecret: string | null,
  refreshToken: string | null
) => {
  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + new Buffer(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json["access_token"];
  }

  return null;
};

export const getStaticProps: GetServerSideProps<PageProps> = async () => {
  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);

  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || null;
  const spotifySecret = process.env.SPOTIFY_CLIENT_SECRET || null;
  const spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN || null;

  const spotifyAuth = await getSpotifyAuthToken(
    spotifyClientId,
    spotifySecret,
    spotifyRefreshToken
  );

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
      spotifyAuth,
    },
  };
};

export default Index;

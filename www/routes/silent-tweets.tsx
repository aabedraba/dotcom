/** @jsx h */
import { h } from "preact";
import { Layout } from "../components/Layout.tsx";
import { createClient } from "supabase";
import { tw } from "twind";
import { PageProps, Handlers } from "$fresh/server.ts";

type Tweet = {
  text: string;
  date: number;
};

export const handler: Handlers<Tweet[] | null> = {
  async GET(_, ctx) {
    const tweetList = await getTweets();

    return ctx.render(tweetList);
  },
};

const SilentTweets = ({ data, ...props }: PageProps<Tweet[]>) => {
  return (
    <Layout url={props.url}>
      <h1 className={tw`text-2xl`}>
        A collection of micro-thoughts from daily life
      </h1>
      <div>
        {data
          .filter((tweet) => tweet != null)
          .sort((a, b) => (a < b ? 1 : -1))
          .map((tweet) => {
            return (
              <div className={tw`mt-3`} key={tweet.date}>
                <p>{tweet.text}</p>
                <p className={tw`text-gray-700 text-sm`}>
                  {new Date(tweet.date).toLocaleString()}
                </p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

const getTweets = async (): Promise<Tweet[]> => {
  const supabaseKey = Deno.env.get("SUPABASE_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");

  if (!supabaseKey || !supabaseUrl) {
    throw new Error("Supabase environment variables not defined");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const query = await supabase.from("silent_tweets").select();
  const data = query.data;

  if (!data) {
    throw new Error("No data retrieved from database");
  }

  const tweets = data.map((row) => {
    return {
      text: row.tweet,
      date: row.created_at,
    };
  });

  return tweets;
};

export default SilentTweets;

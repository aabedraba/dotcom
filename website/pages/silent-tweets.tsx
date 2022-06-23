import { Layout } from "../components/Layout";
import { GetStaticProps } from "next";
import { createClient } from "@supabase/supabase-js";

type Tweet = {
  text: string;
  date: number;
};

const SilentTweets = ({ data }: { data: Tweet[] }) => {
  return (
    <Layout>
      <h1 className="text-2xl">
        A collection of micro-thoughts from daily life
      </h1>
      <div>
        {data
          .filter((tweet) => tweet != null)
          .sort((a, b) => (a < b ? 1 : -1))
          .map((tweet) => {
            return (
              <div className="mt-3">
                <p>{tweet.text}</p>
                <p className="text-gray-700 text-sm">
                  {new Date(tweet.date).toLocaleString()}
                </p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{ data: Tweet[] }> = async () => {
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;

  if (!supabaseKey || !supabaseUrl) {
    throw new Error("Supabase environment variables not defined");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const query = await supabase.from("silent_tweets").select();
  const data = query.data;

  if (!data) {
    throw new Error("No data retrieved from database");
  }

  return {
    props: {
      data: data.map((row) => {
        return {
          text: row.tweet,
          date: row.created_at,
        };
      }),
    },
  };
};

export default SilentTweets;

/** @jsx h */
import { h } from "preact";
import { Layout } from "../components/Layout.tsx";
import { createClient } from "supabase";
import { tw } from "twind";
import { PageProps } from "$fresh/server.ts";

type Tweet = {
  text: string;
  date: number;
};

const SilentTweets = (props: PageProps) => {
  const tweets: Tweet[] = [{ text: "Hello Fresh!", date: Date.now() }];
  return (
    <Layout url={props.url}>
      <h1 className={tw`text-2xl`}>
        A collection of micro-thoughts from daily life
      </h1>
      <div>
        {tweets
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

// export const getStaticProps: GetStaticProps<{ data: Tweet[] }> = async () => {
//   const supabaseKey = process.env.SUPABASE_KEY;
//   const supabaseUrl = process.env.SUPABASE_URL;

//   if (!supabaseKey || !supabaseUrl) {
//     throw new Error("Supabase environment variables not defined");
//   }

//   const supabase = createClient(supabaseUrl, supabaseKey);
//   const query = await supabase.from("silent_tweets").select();
//   const data = query.data;

//   if (!data) {
//     throw new Error("No data retrieved from database");
//   }

//   return {
//     props: {
//       data: data.map((row) => {
//         return {
//           text: row.tweet,
//           date: row.created_at,
//         };
//       }),
//     },
//   };
// };

export default SilentTweets;

import { Layout } from "../components/Layout";
import { initializeApp } from "firebase/app";
import { GetStaticProps } from "next";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aabedraba-com.firebaseapp.com",
  databaseURL: "https://aabedraba-com.firebaseio.com/",
};

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
  const app = initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase(app));

  const data = await get(child(dbRef, `tweets`));

  return {
    props: {
      data: data.val(),
    },
  };
};

export default SilentTweets;

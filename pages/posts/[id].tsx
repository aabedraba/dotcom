import { GetServerSideProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdon from "react-markdown";
import { FC } from "react";
import { Layout } from "../../components/Layout";
import rehypeRaw from "rehype-raw";

type PageProps = {
  content: string;
  title: string;
  date: string;
};

const Post: FC<PageProps> = ({ content, title, date }) => {
  return (
    <Layout>
      <div className="space-y-2 text-justify">
        <h1 className="text-2xl">{title}</h1>
        <span className="text-sm text-gray-600">{date}</span>
        <ReactMarkdon
          className="space-y-7 py-2"
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ node, ...props }) => (
              <a className="text-blue-700 hover:underline" {...props} />
            ),
            h1: ({ node, ...props }) => <h1 className="text-2xl" {...props} />,
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold" {...props} />
            ),
            b: ({ node, ...props }) => <b className="font-bold" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="list-inside list-disc " {...props} />
            ),
            li: ({ node, ...props }) => <li className="pl-2" {...props} />,
            p: ({ node, ...props }) => <p {...props} />,
            img: ({ node, ...props }) => (
              <div className="flex justify-center">
                <img {...props} />
              </div>
            ),
          }}
        >
          {content}
        </ReactMarkdon>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = process.cwd() + "/blogposts/";
  const filePath = path + context.query.id + ".md";

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const result = matter(fileContent);

  return {
    props: {
      content: result.content,
      title: result.data.title,
      date: result.data.date,
    },
  };
};

export default Post;

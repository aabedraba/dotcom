import { GetServerSideProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdon from "react-markdown";
import { FC } from "react";
import { Layout } from "../../components/Layout";
import rehypeRaw from 'rehype-raw'

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
        <span className="text-sm">{date}</span>
        <ReactMarkdon
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ node, ...props }) => <a className="text-blue-700 underline" {...props} />,
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl pb-4" {...props} />
            ),
            b: ({ node, ...props }) => <b className="font-bold" {...props} />,
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

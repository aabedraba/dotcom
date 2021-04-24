import { GetServerSideProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdon from "react-markdown";
import { FC } from "react";

type PageProps = {
  content: string;
};

const Post: FC<PageProps> = ({ content }) => {
  return <ReactMarkdon skipHtml={true}
    components={{
      a: ({node, ...props}) => <a className="text-blue" {...props}/>
    }}
  >{content}</ReactMarkdon>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = process.cwd() + "/blogposts/";
  const filePath = path + context.query.id + ".md";

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const result = matter(fileContent);

  return {
    props: {
      content: result.content,
    },
  };
};

export default Post;

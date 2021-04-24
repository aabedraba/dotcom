import { GetServerSideProps } from "next";
import fs from "fs";
import matter from "gray-matter";

const Post = ({ content }: any) => {
  return <div>{content}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);
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

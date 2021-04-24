import { Layout } from "../components/Layout";
import fs from "fs";
import matter from "gray-matter";
import { GetServerSideProps } from "next";
import Link from "next/link";

type PageProps = {
  postList: {
    id: string;
    title: string;
    date: string;
  }[];
};

const Index = ({ postList }: PageProps) => {
  return (
    <Layout>
      <div className="flex flex-col">
        {postList.map((post) => {
          return (
            <div className="flex justify-center space-x-5 relative ">
              <p>{post.date}</p>
              <Link
                href={{
                  pathname: "/posts/[id]",
                  query: {
                    id: post.id,
                  },
                }}
              >
                <a className="">{post.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);

  const postList = fileNames.map((fileName) => {
    const filePath = path + fileName;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const result = matter(fileContent);
    return {
      id: fileName.replace(".md", "").trim(),
      title: result.data.title,
      date: result.data.date,
    };
  });

  return {
    props: {
      postList,
    },
  };
};

export default Index;

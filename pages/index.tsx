import { Layout } from "../components/Layout";
import fs from "fs";
import matter from "gray-matter";
import { GetServerSideProps } from "next";

type PageProps = {
  postList: {
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
              <p className="">{post.title}</p>
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

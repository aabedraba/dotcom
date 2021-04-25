import { Layout } from "../components/Layout";
import fs from "fs";
import matter from "gray-matter";
import { GetServerSideProps } from "next";
import Link from "next/link";

type PageProps = {
  postList: {
    slug: string;
    title: string;
    date: string;
  }[];
};

const Index = ({ postList }: PageProps) => {
  return (
    <Layout>
      <ul className="space-y-7">
        {postList.map((post) => {
          return (
            <li key={post.title} className="flex">
              <span className="block pr-10 text-gray-700">{post.date}</span>
              <Link
                href={{
                  pathname: "/posts/[slug]",
                  query: {
                    slug: post.slug,
                  },
                }}
              >
                <a>{post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetServerSideProps<PageProps> = async () => {
  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);

  const postList = fileNames.map((fileName) => {
    const filePath = path + fileName;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const result = matter(fileContent);
    return {
      slug: fileName.replace(".md", "").trim(),
      title: result.data.title,
      date: result.data.date,
    };
  });

  return {
    props: {
      postList: postList.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate < bDate ? 1 : -1;
      }),
    },
  };
};

export default Index;

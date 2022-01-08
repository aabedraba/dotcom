import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { Layout } from "../../components/Layout";

type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

type PageProps = {
  postList: Post[];
};

const TagSearch = (props: PageProps) => {
  const router = useRouter();
  const tagSearch = router.query.tag;

  return (
    <Layout>
      <h1 className="text-2xl mb-5">Tag: {tagSearch}</h1>
      <ul className="space-y-5">
        {props.postList.map((post) => {
          return (
            <li key={post.title} className="flex">
              <span className="block pr-10 text-gray-700">
                {new Date(post.date).toISOString().split("T")[0]}
              </span>
              <div className="flex flex-col">
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
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get a list of all unique tags
  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);
  const tags = new Map();

  fileNames
    .map((fileName) => {
      const filePath = path + fileName;
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const result = matter(fileContent);

      return result.data.tags as string;
    })
    .map((postTags) => {
      postTags
        .replace(" ", "")
        .split(",")
        .map((tag) => tags.set(tag, tag));
    });

  console.log(tags);

  const pathNames = [...tags.values()].map((tag) => {
    return {
      params: {
        tag,
      },
    };
  });

  return {
    paths: [...pathNames],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = (context) => {
  const tagSearch = context.params?.tag;

  if (!tagSearch || typeof tagSearch !== "string") {
    return {
      props: {
        postList: [],
      },
    };
  }

  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);

  console.log(tagSearch);
  const postList = fileNames
    .map((fileName): Post => {
      const filePath = path + fileName;
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const result = matter(fileContent);
      return {
        slug: fileName.replace(".md", "").trim(),
        title: result.data.title,
        date: result.data.date,
        tags: result.data.tags.replace(" ", "").split(","),
      };
    })
    .filter((post) => post.tags.includes(tagSearch));

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
export default TagSearch;

import type { PageProps, Handlers } from "$fresh/server.ts";
import { parse as frontMatter } from "frontmatter";
import { Layout } from "../components/Layout.tsx";
import LastSong from "../islands/LastSong.tsx";

type BlogPostDetails = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

export const handler: Handlers<BlogPostDetails[] | null> = {
  async GET(_, ctx) {
    const blogPostDetailList = await getBlogPostList();

    return ctx.render(blogPostDetailList);
  },
};

const Index = ({ data, ...props }: PageProps<BlogPostDetails[]>) => {
  if (!data) {
    return (
      <Layout url={props.url}>
        <div></div>
      </Layout>
    );
  }

  return (
    <Layout url={props.url}>
      <div className="space-y-7">
        <LastSong />
        <ul className="space-y-5">
          {data.map((post) => {
            return (
              <li key={post.title} className="flex">
                <span className="block pr-10 text-gray-700">
                  {new Date(post.date).toISOString().split("T")[0]}
                </span>
                <div className="flex flex-col">
                  <a href={`/posts/${post.slug}`} className="text-blue-600">
                    {post.title}
                  </a>
                  <div>
                    {post.tags.map((tag) => {
                      return (
                        <a
                          href={`/tags/${tag}`}
                          key={tag}
                          className="text-sm text-gray-500 mr-2"
                        >
                          #{tag}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

const getBlogPostList = async () => {
  // Dirty solution to know when it's running through
  // Deno Deploy, vs when it's running though local dev
  const path =
    Deno.cwd() === "/src"
      ? `${Deno.cwd()}/www/blogposts/`
      : `${Deno.cwd()}/blogposts/`;
  const fileNames = Deno.readDir(path);

  const postList: BlogPostDetails[] = [];
  for await (const fileName of fileNames) {
    const filePath = path + fileName.name;
    const decoder = new TextDecoder("utf-8");
    const fileContent = await Deno.readFile(filePath);
    const decodedContent = decoder.decode(fileContent);
    const result = frontMatter(decodedContent);
    postList.push({
      slug: fileName.name.replace(".md", "").trim(),
      // TODO: check how deno solves this `any` thing
      title: (result.data as any).title,
      date: (result.data as any).date,
      tags: (result.data as any).tags.replace(" ", "").split(","),
    });
  }

  // TODO enable tag search
  // if (tagSearch) {
  //   postList = postList.filter((post) => post.tags.includes(tagSearch));
  // }

  return postList.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate < bDate ? 1 : -1;
  });
};

export default Index;

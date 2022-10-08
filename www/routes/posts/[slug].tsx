import { PageProps, Handlers } from "$fresh/server.ts";
import { Layout } from "../../components/Layout.tsx";
import { parse as frontMatter } from "frontmatter";
import Markdown from "markdown-to-jsx";

type BlogPost = {
  content: string;
  title: string;
  date: string;
};

export const handler: Handlers<BlogPost | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const blogPost = await getBlogPost(slug);

    return ctx.render(blogPost);
  },
};

const Post = ({ data, ...props }: PageProps<BlogPost>) => {
  return (
    <Layout url={props.url}>
      <div className="space-y-2 text-justify">
        <h1 className="text-2xl">{data.title}</h1>
        <span className="text-sm text-gray-600">
          {new Date(data.date).toLocaleString()}
        </span>
        <Markdown
          className="space-y-7 py-2"
          options={{
            overrides: {
              a: {
                props: {
                  className: "hover:underline",
                },
              },
              h1: {
                props: {
                  className: "text-2xl",
                },
              },
              h2: {
                props: {
                  className: "ttext-xl font-semibold",
                },
              },
              b: {
                props: {
                  className: "font-bold",
                },
              },
              ul: {
                props: {
                  className: "list-inside list-disc space-y-4",
                },
              },
              ol: {
                props: {
                  className: "ist-inside list-decimal space-y-4",
                },
              },
              li: {
                props: {
                  className: "pl-2",
                },
              },
              img: {
                props: {
                  className: "flex justify-center",
                },
              },
              code: {
                props: {
                  className: "bg-gray-200 p-1 text-sm rounded",
                },
              },
            },
          }}
        >
          {data.content}
        </Markdown>
      </div>
    </Layout>
  );
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  // Dirty solution to know when it's running through
  // Deno Deploy, vs when it's running though local dev
  const path =
    Deno.cwd() === "/src"
      ? `${Deno.cwd()}/www/blogposts/`
      : `${Deno.cwd()}/blogposts/`;
  const filePath = path + slug + ".md";

  const decoder = new TextDecoder("utf-8");
  const fileContent = await Deno.readFile(filePath);
  const decodedContent = decoder.decode(fileContent);
  const result = frontMatter(decodedContent);

  return {
    content: result.content,
    title: (result.data as any).title as string,
    date: (result.data as any).date as string,
  };
};

export default Post;

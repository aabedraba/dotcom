import fs from "fs";
import matter from "gray-matter";
import ReactMarkdon from "react-markdown";
import rehypeRaw from "rehype-raw";

type MatterResult = {
  content: string;
  data: {
    title: string;
    date: string;
  }
};

const Post = ({ params }: { params: { slug: string } }) => {
  const path = process.cwd() + "/blogposts/";
  const filePath = path + params.slug + ".md";

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const result = matter(fileContent) as unknown as MatterResult;

  return (
    <div className="space-y-2 text-justify">
      <h1 className="text-2xl">{result.data.title}</h1>
      <span className="text-sm text-gray-600">
        {new Date(result.data.date).toLocaleString()}
      </span>
      <ReactMarkdon
        className="space-y-7 py-2"
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, ...props }) => (
            <a className="hover:underline" {...props} />
          ),
          h1: ({ node, ...props }) => <h1 className="text-2xl" {...props} />,
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold" {...props} />
          ),
          b: ({ node, ...props }) => <b className="font-bold" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-inside list-disc space-y-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-inside list-decimal space-y-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="pl-2" {...props} />,
          p: ({ node, ...props }) => <p {...props} />,
          img: ({ node, ...props }) => (
            <div className="flex justify-center">
              <img {...props} />
            </div>
          ),
          code: ({ node, ...props }) => (
            <code
              className="bg-gray-200 p-1 text-sm rounded"
              {...props}
            ></code>
          ),
        }}
      >
        {result.content}
      </ReactMarkdon>
    </div>
  );
};

export default Post;

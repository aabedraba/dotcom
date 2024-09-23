import Link from "next/link";
import articleList from "./external-articles.json";

const Index = async () => {
  return (
    <div className="space-y-7">
      <ul className="space-y-5">
        {articleList
          .sort((a, b) =>
            new Date(a.publishDate) < new Date(b.publishDate) ? 1 : -1,
          )
          .map((post) => {
            return (
              <li key={post.title} className="flex">
                <span className="w-32 text-gray-700">
                  {new Date(post.publishDate).toISOString().split("T")[0]}
                </span>
                <div className="flex flex-col">
                  <Link href={post.href}>{post.title}</Link>

                  <div className="flex">
                    {post.category.map((tag) => {
                      return (
                        <p key={tag} className="text-sm text-gray-500 mr-2">
                          #{tag}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Index;

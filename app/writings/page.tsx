"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import articleList from "./external-articles.json";

export default function Component() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articleList.forEach((article) => {
      article.category.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const { highlightedArticles, regularArticles } = useMemo(() => {
    const highlighted = articleList
      .filter((article) => article.highlighted)
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
      );
    const regular = articleList
      .filter((article) => !article.highlighted)
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
      );
    return { highlightedArticles: highlighted, regularArticles: regular };
  }, []);

  const filteredArticles = useMemo(() => {
    return regularArticles.filter(
      (article) =>
        selectedTags.length === 0 ||
        article.category.some((tag) => selectedTags.includes(tag)),
    );
  }, [regularArticles, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="space-y-10">
      {highlightedArticles.length > 0 && (
        <section aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="text-2xl font-bold mb-4">
            Highlights
          </h2>
          <ul className="space-y-4">
            {highlightedArticles.map((post) => (
              <li key={post.title} className="bg-blue-50 p-4 rounded-lg">
                <ArticleItem post={post} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="all-articles-title">
        <h2 id="all-articles-title" className="text-2xl font-bold mb-4">
          All Articles
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
        <ul className="space-y-5">
          {filteredArticles.map((post) => (
            <li key={post.title}>
              <ArticleItem post={post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ArticleItem({ post }) {
  return (
    <div className="flex">
      <span className="w-32 text-gray-700">
        {new Date(post.publishDate).toISOString().split("T")[0]}
      </span>
      <div className="flex flex-col">
        <div className="flex space-x-2">
          <span>
            {post.title}
            {" - "}
          </span>
          <Link href={post.href} className="underline flex">
            {new URL(post.href).hostname} <IconExternal className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex">
          {post.category.map((tag) => (
            <p key={tag} className="text-sm text-gray-500 mr-2">
              #{tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function IconExternal(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
      <path
        fill="currentColor"
        d="M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914-1.414-1.414 4.95-4.95z"
      />
      <path
        fill="currentColor"
        d="M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4v-2z"
      />
    </svg>
  );
}

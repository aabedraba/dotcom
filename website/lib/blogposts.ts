import fs from "fs";
import matter from "gray-matter";

export const getBlogposts = (tagSearch?: string) => {
  const path = process.cwd() + "/blogposts/";
  const fileNames = fs.readdirSync(path);

  let postList = fileNames.map((fileName: string) => {
    const filePath = path + fileName;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const result = matter(fileContent);
    return {
      slug: fileName.replace(".md", "").trim(),
      title: result.data.title,
      date: result.data.date,
      tags: result.data.tags.replace(" ", "").split(","),
    };
  });

  if (tagSearch) {
    postList = postList.filter((post) => post.tags.includes(tagSearch));
  }

  return postList.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate < bDate ? 1 : -1;
  });
};

import { Layout } from "../components/Layout.tsx";
import { PageProps } from "$fresh/server.ts";

const Social = (props: PageProps) => {
  return (
    <Layout url={props.url}>
      <ul className="space-y-7">
        <li>
          <a href="https://github.com/aabedraba">Github</a>
        </li>
        <li>
          <a href="https://twitter.com/aabedraba">Twitter</a>
        </li>
        <li>
          <a href="https://instagram.com/aabedraba">Instagram</a>
        </li>
        <li>
          <a href="https://linkedin.com/in/aabedraba">Linkedin</a>
        </li>
        <li>
          <a href="posts_1.html">Old Instagram</a>
        </li>
      </ul>
    </Layout>
  );
};

export default Social;

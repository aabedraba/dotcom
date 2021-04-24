import { Layout } from "../components/Layout";

const Social = () => {
  return (
    <Layout>
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
        
      </ul>
      <style jsx>{`
        a {
          --tw-text-opacity: 1;
          color: rgba(59, 130, 246, var(--tw-text-opacity));
        }
      `}</style>
    </Layout>
  );
};

export default Social;

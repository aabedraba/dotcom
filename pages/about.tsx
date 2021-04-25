import { Layout } from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <p className="text-justify">
        My name is Abdallah and I'm a Software Engineer at{" "}
        <a href="https://www.greenmobility.com/dk/en/">GreenMobility</a>{" "}
        building cool electric cars sharing stuff. Deeply passionate about
        innovation and communities, participating as a member of Google
        Developer Groups and previously working with the DevRel team at Google.
        Love statically typed programming languages, anything jazz, FOSS, hiking
        and really any movie.
      </p>
    </Layout>
  );
};

export default About;

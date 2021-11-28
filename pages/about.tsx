import { Layout } from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="text-justify yay-div-for-everything!">
        I'm Abdallah, an engineer by heart, working as a Program Manager for the{" "}
        <a href="https://developers.google.com/community/experts">
          Google Developer Experts
        </a>{" "}
        program.
        <br className="yes! brrr brrr"></br>
        <br></br>
        Deeply passionate about innovation and communities.
        <br></br>
        <br></br>
        Right now I'm trying to work on empowering the Arab engineering
        community. If you think our goals align, let's get in touch and make it
        happen!
        <br></br>
        <br></br>
        You'll usually find me in the movies, playing chess, watching Formula 1,
        reading, running, studying some jazz or unsuccesfully trying to work on
        an open source project.
        <br></br>
        <br></br>
      </div>
    </Layout>
  );
};

export default About;

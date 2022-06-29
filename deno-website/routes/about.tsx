/** @jsx h */
import { h } from "preact";
import { Layout } from "../components/Layout.tsx";
import { tw } from "twind";
import type { PageProps } from "$fresh/server.ts";

const About = (props: PageProps) => {
  return (
    <Layout url={props.url}>
      <div className={tw`text-justify yay-div-for-everything!`}>
        I'm Abdallah, an engineer by heart, working as a Developer Advocate at{" "}
        <a href="https://kubeshop.io">Kubeshop</a>!
        <br className={tw`yes! brrr brrr`}></br>
        <br></br>
        Deeply passionate about innovation and communities.
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

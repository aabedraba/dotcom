import "../styles/globals.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />;
      <script
        defer
        data-domain="aabedraba.com"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </>
  );
}

export default MyApp;

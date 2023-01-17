import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS } from "deno-gfm";

export default function App({ Component }: AppProps) {
  return (
    <div>
      <Head>
        <title>Abdallah Abedraba</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <script
          async
          src="https://ackee-production-e7f2.up.railway.app/tracker.js"
          data-ackee-server="https://ackee-production-e7f2.up.railway.app"
          data-ackee-domain-id="a9044a28-af8e-4e1e-9aea-b1150e9e4e66"
        ></script>
        <style>{CSS}</style>
      </Head>
      <Component />
    </div>
  );
}

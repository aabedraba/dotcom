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
        <style>{CSS}</style>
      </Head>
      <Component />
    </div>
  );
}

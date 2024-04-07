import { useEffect } from "react";
import Head from "next/head";
import { MainLayout } from "../components/main-layout";
import { Features } from "../components/home/features";
import { Hero } from "../components/home/hero";
import { Support } from "../components/home/support";
import { gtm } from "../lib/gtm";

const Home = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <div>
      <Head>
        <title>Moxie | Moxie App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Join our community of Moxie Kings & Queens today and never be left in need of anything." />
        <meta name="keywords" content="Moxie App" />
        <meta name="author" content="Moxie App" />
        <meta name="MobileOptimized" content="320" />
        <meta name="HandheldFriendly" content="True" />
        <style>
          {`
            body {
              overflow-x: hidden;
            }
          `}
        </style>
      </Head>
      <MainLayout ismain={true}>
        <Hero />
        {/* <Features /> */}
        <Support />
      </MainLayout>
    </div>
  );
};

export default Home;

import Head from 'next/head';

import '../styles/globals.css';

export default function App(props) {
  const { Component, pageProps } = props;
  
  return (
    <>
      <Head>
        <title>Taskmate</title>
        <meta name="description" content="Organize and visualize team goals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

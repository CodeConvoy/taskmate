import Head from 'next/head';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../util/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

import '../styles/globals.css';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  const { Component, pageProps } = props;

  // listen for user auth
  const auth = getAuth();
  useAuthState(auth);

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

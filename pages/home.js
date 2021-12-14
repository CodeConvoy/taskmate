import Router from 'next/router';
import Tasks from '../components/Tasks';
import Loading from '../components/Loading';

import { useEffect } from 'react';

import styles from '../styles/pages/Home.module.css';

export default function Home(props) {
  const { authed } = props;

  // route away if not authed
  useEffect(() => {
    if (authed === false) Router.push('/');
  }, [authed]);

  // return loading if not authed
  if (!authed) return <Loading />;

  return (
    <div>
      <Tasks />
    </div>
  );
}

import Head from 'next/head';
import MyProfile from '../src/components/MyProfile';

const ProfilePage = () => {
  return (
    <div>
      <Head>
        <title>Ceramic Example App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyProfile />
    </div>
  );
};

export default ProfilePage;

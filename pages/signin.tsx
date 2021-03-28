import Head from 'next/head';
import SignInAccount from '../src/components/SignInAccount';

const SignInPage = () => {
  return (
    <div>
      <Head>
        <title>Ceramic Example App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInAccount signUpPath="/signup" />
    </div>
  );
};

export default SignInPage;

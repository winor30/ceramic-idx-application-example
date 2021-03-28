import Head from 'next/head';
import SignUpAccount from '../src/components/SignUpAccount';

const SignUpPage = () => {
  return (
    <div>
      <Head>
        <title>Ceramic Example App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpAccount signInPath="/signin" />
    </div>
  );
};

export default SignUpPage;

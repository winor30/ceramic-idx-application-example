import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSignIn } from '../hooks/useSign';

interface Props {
  signUpPath: string;
}

const SignInAccount = ({ signUpPath }: Props) => {
  const { signIn, values } = useSignIn();
  const signInAccount = async () => {
    await signIn();
  };

  const router = useRouter();
  useEffect(() => {
    switch (values.status) {
      case 'no-account':
        alert('アカウントが作成されていません');
        break;
      case 'error':
        alert('エラーが発生しました');
        break;
      case 'logged-in':
        router.push('/profile');
        break;
    }
  }, [values.status]);
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-16 w-auto rounded-full" src="app_icon.png" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            自己紹介を確認しよう！
          </h2>
        </div>
        <div>
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={values.status === 'loading'}
            onClick={signInAccount}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {/*  Heroicon name: solid/lock-closed */}
              {values.status !== 'loading' && (
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            {values.status !== 'loading' && '確認する'}
            {values.status === 'loading' && '検証中'}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href={signUpPath}>
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                新しく作成する方はこちら
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInAccount;

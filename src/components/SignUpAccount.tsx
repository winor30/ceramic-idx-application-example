import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSignUp } from '../hooks/useSign';

interface Inputs {
  name: string;
  description: string;
}

interface Props {
  signInPath: string;
}

const SignUpAccount = ({ signInPath }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { signUp, values } = useSignUp();
  const createAccount = async (data: { name: string; description?: string }) => {
    await signUp({ name: data.name, description: data.description || '' });
  };

  const router = useRouter();
  useEffect(() => {
    switch (values.status) {
      case 'already-created':
        alert('既に作成済みです');
        break;
      case 'error':
        alert('エラーが発生しました');
        break;
      case 'created-new-account':
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
            自己紹介を書こう！
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(createAccount)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                名前
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="名前"
                ref={register({ required: true })}
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                自己紹介
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="自己紹介を書こう！"
                defaultValue={''}
                ref={register}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={values.status === 'loading'}
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
              {values.status !== 'loading' && '自己紹介作成'}
              {values.status === 'loading' && '作成中'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href={signInPath}>
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  既に作成済みの方はこちら
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpAccount;

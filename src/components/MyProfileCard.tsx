import { useRouter } from 'next/router';
import { useProfile } from '../hooks/useProfile';

const MyProfileCard = () => {
  const router = useRouter();
  const profile = useProfile({
    onError: () => {
      router.push('/signup');
    },
  });
  if (!profile) {
    return (
      <div className="border border-light-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        loading...
      </div>
    );
  }

  return (
    <div className="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
      <img src="https://i.imgur.com/dYcYQ7E.png" className="w-full" />
      <div className="flex justify-center -mt-8">
        <img
          src="user_icon.png"
          className="h-20 w-20 rounded-full border-solid border-white border-2 -mt-3"
        />
      </div>
      <div className="text-center px-3 pb-6 pt-2">
        <h3 className="text-black text-sm bold font-sans">{profile?.name}</h3>
        <p className="mt-2 font-sans font-light text-grey-dark">{profile?.description}</p>
      </div>
    </div>
  );
};

export default MyProfileCard;

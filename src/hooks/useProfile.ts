import { useEffect, useState } from 'react';
import { getBasicProfile } from '../libs/idx/getBasicProfile';
import { Profile } from '../type/profile';

interface Options {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useProfile = (options?: Options) => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    (async () => {
      const profile = await getBasicProfile();
      if (!profile || profile instanceof Error) {
        if (options?.onError) options.onError();
        return;
      }

      setProfile({ name: profile.name, description: profile.description });
      if (options?.onSuccess) options.onSuccess();
    })();
  }, []);

  return profile;
};

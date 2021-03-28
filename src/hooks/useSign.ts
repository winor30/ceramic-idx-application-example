import * as constants from '@ceramicstudio/idx-constants';
import { useState } from 'react';
import { returnErr } from '../libs/common/catch';
import { getIdx } from '../libs/idx';
import { getBasicProfile } from '../libs/idx/getBasicProfile';

type Status =
  | 'init'
  | 'loading'
  | 'logged-in'
  | 'created-new-account'
  | 'already-created'
  | 'error'
  | 'no-account';

export const useSignUp = () => {
  const [status, setStatus] = useState<Status>('init');
  const signUp = async (data: { name: string; description: string }) => {
    setStatus('loading');

    const basicProfile = await getBasicProfile().catch(returnErr);
    if (basicProfile instanceof Error) {
      console.log(basicProfile);
      setStatus('error');
      return;
    }
    if (basicProfile) {
      setStatus('already-created');
      return;
    }

    const idx = getIdx();
    const docID = await idx
      .set(constants.definitions.basicProfile, {
        name: data.name,
        description: data.description,
      })
      .catch(returnErr);
    if (docID instanceof Error) {
      console.error(docID);
      setStatus('error');
      return;
    }
    setStatus('created-new-account');
  };

  return {
    signUp,
    values: {
      status,
    },
  };
};

export const useSignIn = () => {
  const [status, setStatus] = useState<Status>('init');
  const signIn = async () => {
    setStatus('loading');

    const basicProfile = await getBasicProfile().catch(returnErr);
    if (basicProfile instanceof Error) {
      console.error(basicProfile);
      setStatus('error');
      return;
    }
    if (!basicProfile) {
      setStatus('no-account');
      return;
    }

    setStatus('logged-in');
  };

  return {
    signIn,
    values: {
      status,
    },
  };
};

import { EthereumAuthProvider } from '3id-connect';
import * as constants from '@ceramicstudio/idx-constants';
import { getIdx } from '.';
import { getThreeIdConnect } from '../3id';
import { returnErr } from '../common/catch';

interface LoginData {
  name: string;
  description: string;
}

declare let window: Window & typeof globalThis & { ethereum: any };

export const getBasicProfile = async (): Promise<Error | LoginData | null> => {
  const addresses: string[] | Error = await window.ethereum.enable().catch(returnErr);
  if (addresses instanceof Error) {
    return addresses;
  }

  const address = addresses[0];
  if (!address) {
    return new Error('address is undefined');
  }

  const authProvider = new EthereumAuthProvider(window.ethereum, address);
  const threeIdConnect = getThreeIdConnect();
  const connected = await threeIdConnect.connect(authProvider).catch(returnErr);
  if (connected instanceof Error) {
    return connected;
  }

  const idx = getIdx();
  const didProvider = threeIdConnect.getDidProvider();
  // TODO: ts-ignoreを消せるか考える
  // @ts-ignore
  const result = await idx.ceramic.setDIDProvider(didProvider).catch(returnErr);
  if (result instanceof Error) {
    return result;
  }

  const did = didProvider.accountId;
  const basicProfile = await idx
    .get<LoginData | undefined>(constants.definitions.basicProfile, did)
    .catch(returnErr);
  if (!basicProfile) {
    return null;
  }
  return basicProfile;
};

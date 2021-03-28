import Ceramic from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';
import { CERAMIC_CLAY_URL } from './constant';

let ceramic: Ceramic;
const getCeramic = () => {
  if (ceramic) return ceramic;
  ceramic = new Ceramic(CERAMIC_CLAY_URL);
  return ceramic;
};

let idx: IDX;
const getIdx = () => {
  if (idx) return idx;
  const ceramic = getCeramic();
  idx = new IDX({ ceramic });
  return idx;
};

export { getIdx, getCeramic };

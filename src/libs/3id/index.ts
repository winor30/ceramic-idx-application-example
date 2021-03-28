import { ThreeIdConnect } from '3id-connect';

let threeIdConnect: ThreeIdConnect;
const getThreeIdConnect = () => {
  if (threeIdConnect) return threeIdConnect;
  threeIdConnect = new ThreeIdConnect();
  return threeIdConnect;
};

export { getThreeIdConnect };

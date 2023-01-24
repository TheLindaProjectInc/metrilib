import { ethers } from 'ethers';

const tokenInfo = (name: string, symbol: string, baseURI: string): string => {
  return ethers.utils.solidityKeccak256(
    ['string', 'string', 'string'],
    [name, symbol, baseURI]
  );
};

const permissionSlip = (
  info: string,
  royalty: bigint,
  burnable: boolean,
  nonce: bigint,
  beneficiary: string
): string => {
  return ethers.utils.solidityKeccak256(
    ['bool', 'bytes32', 'bytes32', 'bytes32'],
    [
      burnable,
      info,
      ethers.utils.solidityKeccak256(
        ['uint96', 'address'],
        [`0x${royalty.toString(16)}`, beneficiary]
      ),
      ethers.utils.solidityKeccak256(
        ['uint256', 'address'],
        [`0x${nonce.toString(16)}`, beneficiary]
      )
    ]
  );
};
export { tokenInfo, permissionSlip };

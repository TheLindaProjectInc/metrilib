import { solidityPackedKeccak256 } from 'ethers';

const tokenInfo = (name: string, symbol: string, baseURI: string): string => {
  return solidityPackedKeccak256(
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
  return solidityPackedKeccak256(
    ['bool', 'bytes32', 'bytes32', 'bytes32'],
    [
      burnable,
      info,
      solidityPackedKeccak256(
        ['uint96', 'address'],
        [`0x${royalty.toString(16)}`, beneficiary]
      ),
      solidityPackedKeccak256(
        ['uint256', 'address'],
        [`0x${nonce.toString(16)}`, beneficiary]
      )
    ]
  );
};
export { tokenInfo, permissionSlip };

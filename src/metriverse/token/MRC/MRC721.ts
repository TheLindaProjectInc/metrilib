import { ZeroAddress, ZeroHash } from 'ethers';
import ABI from '../../../abi';
import { IERC721Enumerable, MetrixContract, Transaction } from '../../../mrx';
import Provider from '../../../provider/Provider';

export default class MRC721
  extends MetrixContract
  implements IERC721Enumerable
{
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.MRC721);
  }

  async totalSupply(): Promise<bigint> {
    const total = await this.call(`totalSupply()`, []);
    return !isNaN(Number(total ? total.toString() : undefined))
      ? BigInt(
          total!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async tokenByIndex(index: bigint): Promise<string> {
    const tkn = await this.call(`tokenByIndex(uint256)`, [
      `0x${index.toString(16)}`
    ]);
    return tkn ? tkn.toString() : ZeroHash;
  }

  async tokenOfOwnerByIndex(owner: string, index: bigint): Promise<string> {
    const tkn = await this.call(`tokenOfOwnerByIndex(address,uint256)`, [
      owner,
      `0x${index.toString(16)}`
    ]);
    return tkn ? tkn.toString() : ZeroHash;
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(
          balance!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async ownerOf(tokenId: bigint): Promise<string> {
    const owner = await this.call(`ownerOf(uint256)`, [
      `0x${tokenId.toString(16)}`
    ]);
    return owner ? owner.toString() : ZeroAddress;
  }

  async safeTransferFrom(
    from: string,
    to: string,
    tokenId: bigint
  ): Promise<Transaction> {
    const tx = await this.send('safeTransferFrom(address,address,uint256)', [
      from,
      to,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async transferFrom(
    from: string,
    to: string,
    tokenId: bigint
  ): Promise<Transaction> {
    const tx = await this.send('transferFrom(address,address,uint256)', [
      from,
      to,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async approve(to: string, tokenId: bigint): Promise<Transaction> {
    const tx = await this.send('approve(address,uint256)', [
      to,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async getApproved(tokenId: bigint): Promise<string> {
    const approved = await this.call(`getApproved(uint256)`, [
      `0x${tokenId.toString(16)}`
    ]);
    return approved ? approved.toString() : ZeroAddress;
  }

  async setApprovalForAll(
    operator: string,
    approved: boolean
  ): Promise<Transaction> {
    const tx = await this.send('setApprovalForAll(address,bool)', [
      operator,
      approved
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    const approvedForAll = await this.call(
      `isApprovedForAll(address,address)`,
      [owner, operator]
    );
    return approvedForAll ? approvedForAll.toString() === 'true' : false;
  }

  async safeTransferFromData(
    from: string,
    to: string,
    tokenId: bigint,
    data: string
  ): Promise<Transaction> {
    const tx = await this.send(
      'safeTransferFrom(address,address,uint256,bytes)',
      [from, to, `0x${tokenId.toString(16)}`, data]
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async name(): Promise<string> {
    const n = await this.call(`name()`, []);
    return n ? n.toString() : '';
  }

  async symbol(): Promise<string> {
    const sym = await this.call(`symbol()`, []);
    return sym ? sym.toString() : '';
  }

  async tokenURI(tokenId: bigint): Promise<string> {
    const uri = await this.call(`tokenURI(uint256)`, [
      `0x${tokenId.toString(16)}`
    ]);
    return uri ? uri.toString() : '';
  }

  async supportsInterface(interfaceId: string): Promise<boolean> {
    const result = await this.call('supportsInterface(bytes4)', [interfaceId]);
    return result ? result.toString() === 'true' : false;
  }
}

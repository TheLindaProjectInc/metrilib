import ABI from '../../../abi';
import { IERC20Metadata } from '../../../mrx/interface/IERC20Metadata';
import MetrixContract from '../../../mrx/MetrixContract';
import { Transaction } from '../../../mrx/Transaction';
import Provider from '../../../provider/Provider';

export default class MRC20 extends MetrixContract implements IERC20Metadata {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.MetriVerse.MRC20);
  }

  async name(): Promise<string> {
    const n = await this.call(`name()`, []);
    return n ? n.toString() : '';
  }

  async symbol(): Promise<string> {
    const sym = await this.call(`symbol()`, []);
    return sym ? sym.toString() : '';
  }

  async decimals(): Promise<number> {
    const dec = await this.call(`decimals()`, []);
    return !isNaN(Number(dec ? dec.toString() : undefined))
      ? Number(
          dec! /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : Number(0);
  }

  async allowance(owner: string, spender: string): Promise<bigint> {
    const allowance = await this.call(`allowance(address,address)`, [
      owner,
      spender
    ]);
    return !isNaN(Number(allowance ? allowance.toString() : undefined))
      ? BigInt(
          allowance!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async approve(spender: string, amount: bigint): Promise<Transaction> {
    const tx = await this.send('approve(address,uint256)', [
      spender,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(
          balance!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async totalSupply(): Promise<bigint> {
    const total = await this.call(`totalSupply()`, []);
    return !isNaN(Number(total ? total.toString() : undefined))
      ? BigInt(
          total!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async transfer(recipient: string, amount: bigint): Promise<Transaction> {
    const tx = await this.send('transfer(address,uint256)', [
      recipient,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async transferFrom(
    sender: string,
    recipient: string,
    amount: bigint
  ): Promise<Transaction> {
    const tx = await this.send('transferFrom(address,uint256)', [
      sender,
      recipient,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}

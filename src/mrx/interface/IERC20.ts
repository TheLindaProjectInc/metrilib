import { Transaction } from '../Transaction';

/**
 * Interface that represents a smart contract, which implements EIP20
 *
 * @interface
 */
export interface IERC20 {
  /**
   * Returns the remaining number of tokens that `spender` will be
   * allowed to spend on behalf of `owner` through {@link transferFrom}. This is
   * zero by default.
   * This value changes when {@link approve} or {@link transferFrom} are called.
   *
   * @param owner
   * @param spender
   */
  allowance(owner: string, spender: string): Promise<bigint>;

  /**
   * Sets `amount` as the allowance of `spender` over the caller's tokens.
   *
   * Emits an {Approval} event.
   *
   * @param spender
   * @param amount
   */
  approve(spender: string, amount: bigint): Promise<Transaction>;

  /**
   * Returns the amount of tokens owned by `account`.
   * @param account
   */
  balanceOf(account: string): Promise<bigint>;

  /**
   * Returns the amount of tokens in existence.
   */
  totalSupply(): Promise<bigint>;

  /**
   * Moves `amount` tokens from the caller's account to `recipient`.
   *
   * Emits a {Transfer} event.
   *
   * @param recipient
   * @param amount
   */
  transfer(recipient: string, amount: bigint): Promise<Transaction>;

  /**
   * Moves `amount` tokens from `sender` to `recipient` using the
   * allowance mechanism. `amount` is then deducted from the caller's
   * allowance.
   *
   * Emits a {Transfer} event.
   *
   * @param sender
   * @param recipient
   * @param amount
   */
  transferFrom(
    sender: string,
    recipient: string,
    amount: bigint
  ): Promise<Transaction>;
}

import { Transaction } from '../Transaction';
import { IERC20Metadata } from './IERC20Metadata';

/**
 * Interface that represents a smart contract, which implements EIP20
 *
 * @interface
 */
export interface ERC20 extends IERC20Metadata {
  /**
   * Atomically increases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {@link approve} that can be used as a mitigation for
   * problems described in {@link approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   * @param spender
   * @param amount
   */
  increaseAllowance(spender: string, amount: bigint): Promise<Transaction>;

  /**
   * Atomically decreases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {@link approve} that can be used as a mitigation for
   * problems described in {@link approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   * - `spender` must have allowance for the caller of at least
   * `amount`.
   * @param spender
   * @param amount
   */
  decreaseAllowance(spender: string, amount: bigint): Promise<Transaction>;
}

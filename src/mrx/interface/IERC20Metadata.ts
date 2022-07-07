import { IERC20 } from './IERC20';

/**
 * Interface that represents a smart contract, which implements EIP20 with the optional Metadata extension
 *
 * @interface
 */
export interface IERC20Metadata extends IERC20 {
  /**
   *  Returns the name of the token.
   */
  name(): Promise<string>;

  /**
   *  Returns the symbol of the token.
   */
  symbol(): Promise<string>;

  /**
   *  Returns the decimals places of the token.
   */
  decimals(): Promise<number>;
}

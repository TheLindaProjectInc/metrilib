[![GitHub license](https://img.shields.io/github/license/TheLindaProjectInc/metrilib)](https://github.com/TheLindaProjectInc/metrilib/blob/main/LICENSE.md) [![npm version](https://badge.fury.io/js/@metrixcoin%2Fmetrilib.svg)](https://badge.fury.io/js/@metrixcoin%2Fmetrilib) ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/TheLindaProjectInc/metrilib/develop) [![Node.js CI](https://github.com/TheLindaProjectInc/metrilib/actions/workflows/node.js.yml/badge.svg)](https://github.com/TheLindaProjectInc/metrilib/actions/workflows/node.js.yml)

# metrilib

metrilib is a library which can be used to interact with MetriVerse core contracts.

### [**Documentation**](https://thelindaprojectinc.github.io/metrilib/modules.html)

### Installation

```
npm install --save @metrixcoin/metrilib
```

### Example usage

```
const network = 'MainNet'; // can be 'MainNet' or 'TestNet'

//  const mrpc = new MetrixRPCNode(
//    null,
//    'http://localhost:33841',
//    'rpcuser',
//    'rpcpass'
//  );
//  const sender = 'maTQfd4w7mqCzGL32RgBFMYY9ehCmjLEGf'; // sending address which the wallet controls the keys for
//  const provider = new RPCProvider(network, mrpc, sender); // create a read/write provider using a local wallet daemon (usually used server side)

//  const provider = new Web3Provider(network); // create a read/write provider using web3 (MetriMask) (always used client side)

const provider = new APIProvider(network); // create a readonly provider using the explorer API (usually used client side)
const tokenId = `0x${BigInt(0).toString(16)}`; // the token id (uint256) as a hex string
const tokenAddress = '848b9ec4299dac31d21c5db87add813d0cfc58c5' // PyroPets mainnet address

const nft = new MRC721(tokenAddress, provider);

const name = await nft.name(); // PyroPets
const symbol = await nft.symbol(); // PYRO
const totalSupply = await nft.totalSupply(); // bigint of the total supply

const tokenURI = await nft.tokenURI(tokenId); // https://pyropets.org/api/metadata/MainNet/0

const mrc20Address = 'fb26a19c8c75cc4a7dfc95260cd838bf204cf1af' // Embers mainnet address
const mrc20 = new MRC20(mrc20Address, provider);
const nft = new MRC721(tokenAddress, provider);

const tknName = await mrc20.name(); // Embers
const tknSymbol = await mrc20.symbol(); // MBRS
const decimals = await mrc20.decimals() // 0
const tknTotalSupply = await mrc20.totalSupply(); // bigint of the total supply,
                                                  // this unit will be the smallest unit
                                                  // and dependent on the number of decimal places
                                                  // this unit would represent satoshis when dealing
                                                  // with MRX, which has 8 decimal places


```

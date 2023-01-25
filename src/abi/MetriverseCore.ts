export const MetriverseCore = [
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_controllers',
        type: 'address[]'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'controller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'active',
        type: 'bool'
      }
    ],
    name: 'ControllerChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'contractAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'factory',
        type: 'address'
      }
    ],
    name: 'MRC721Created',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'assetAddress',
        type: 'address'
      },
      { internalType: 'bool', name: 'approved', type: 'bool' }
    ],
    name: 'approveToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'approvedToken',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'auctionController',
    outputs: [
      {
        internalType: 'contract MRC721AuctionController',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'auctionFee',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'burnableFactory',
    outputs: [
      {
        internalType: 'contract BurnableMRC721Factory',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'controllers',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      {
        internalType: 'string',
        name: '_baseURI',
        type: 'string'
      },
      { internalType: 'bool', name: 'burnable', type: 'bool' },
      {
        internalType: 'uint96',
        name: '_royalty',
        type: 'uint96'
      },
      {
        internalType: 'address payable',
        name: '_beneficiary',
        type: 'address'
      },
      { internalType: 'bytes', name: '_signature', type: 'bytes' }
    ],
    name: 'createMRC721',
    outputs: [{ internalType: 'address', name: 'mrc721', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'contract MRC721Factory',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'price', type: 'uint256' }],
    name: 'getAuctionRoyalty',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'getControllers',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'internalToken',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'internalTokenCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'internalTokenIndex',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'assetAddress',
        type: 'address'
      }
    ],
    name: 'isApprovedToken',
    outputs: [{ internalType: 'bool', name: 'isApproved', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'assetAddress',
        type: 'address'
      }
    ],
    name: 'isInternalToken',
    outputs: [{ internalType: 'bool', name: 'isInternal', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'core', type: 'address' }],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'nonce',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'info', type: 'bytes32' },
      {
        internalType: 'uint96',
        name: '_royalty',
        type: 'uint96'
      },
      { internalType: 'bool', name: '_burnable', type: 'bool' },
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256'
      },
      {
        internalType: 'address payable',
        name: '_beneficiary',
        type: 'address'
      }
    ],
    name: 'permissionSlip',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'receiver',
        type: 'address'
      },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'sendFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_controller',
        type: 'address'
      }
    ],
    name: 'setAuctionController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint96', name: 'fee', type: 'uint96' }],
    name: 'setAuctionFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factory',
        type: 'address'
      }
    ],
    name: 'setBurnableFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'controller',
        type: 'address'
      },
      { internalType: 'bool', name: 'active', type: 'bool' }
    ],
    name: 'setController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factory',
        type: 'address'
      }
    ],
    name: 'setFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      { internalType: 'string', name: 'uri', type: 'string' }
    ],
    name: 'tokenInfo',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { stateMutability: 'payable', type: 'receive' }
];

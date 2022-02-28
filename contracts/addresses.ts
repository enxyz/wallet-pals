// addresses must be known to check, see:
// https://stackoverflow.com/questions/68085393/web3-get-all-tokens-by-wallet-address

import { Token } from '../types/types';

export const knownTokens: Array<Token> = [
  { symbol: 'BOTTO', address: '0x9dfad1b7102d46b1b197b90095b5c4e9f5845bba' },
  { symbol: 'BTRST', address: '0x799ebfABE77a6E34311eeEe9825190B9ECe32824' },
  { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
  { symbol: 'ENS', address: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72' },
  { symbol: 'GM', address: '0xbc7250c8c3eca1dfc1728620af835fca489bfdf3' },
  { symbol: 'INDEX', address: '0x0954906da0Bf32d5479e25f46056d22f08464cab' },
  { symbol: 'LPT', address: '0x58b6a8a3302369daec383334672404ee733ab239' },
  { symbol: 'MATIC', address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0' },
  { symbol: 'NXM', address: '0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b' },
  { symbol: 'NFTX', address: '0x87d73e916d7057945c9bcd8cdd94e42a6f47f776' },
  { symbol: 'ORANGE', address: '0x1bBD79f1Ecb3f2cCC586A5E3A26eE1d1D2E1991f' },
  { symbol: 'PAINT', address: '0x4c6ec08cf3fc987c6c4beb03184d335a2dfc4042' },
  { symbol: 'PAPER', address: '0x7ae1d57b58fa6411f32948314badd83583ee0e8c' },
  { symbol: 'PEOPLE', address: '0x7a58c0be72be218b41c608b7fe7c5bb630736c71' },
  { symbol: 'RARI', address: '0xfca59cd816ab1ead66534d82bc21e7515ce441cf' },
  { symbol: 'ROBOT', address: '0xfb5453340c03db5ade474b27e68b6a9c6b2823eb' },
  { symbol: 'SOS', address: '0x3b484b82567a09e2588A13D54D032153f0c0aEe0' },
  { symbol: 'UNI', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' },
  { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
  { symbol: 'XAMP', address: '0xf911a7ec46a2c6fa49193212fe4a2a9b95851c27' },
];

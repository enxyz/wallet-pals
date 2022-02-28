// MVP check wallets by hand with
// https://etherscan.io/tokenholdings?a=[0x123...789xyz]
//
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

// TODO: move to `.env `
const ethereum_mainnet_rpc: string =
  'wss://eth-mainnet.alchemyapi.io/v2/JZwhf6Tk1cXqp-KdVkQzJN7m65uKcrxb';
// const ethereum_mainnet_rpc: string = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(ethereum_mainnet_rpc);
// var Web3 = require('web3');
console.log('ethereum_mainnet_rpc', ethereum_mainnet_rpc);

// const web3 = new Web3(Web3.givenProvider || ethereum_mainnet_rpc);
const ens = web3.eth.ens;

import { erc20AbiJson } from '../contracts/json-interfaces.js';
import { knownTokens } from '../contracts/addresses';
import { Token } from '../types/types';
import { Contract } from 'ethers';

// allow for ens names like 'cameron.eth'
const _getRawAddress = async (address: string) => {
  // check for '.' not '.eth' per https://docs.ens.domains/dapp-developer-guide/resolving-names
  if (address.includes('.')) {
    return await ens.getAddress(address);
  } else {
    return address;
  }
};

const _getTokensForSymbols = (symbolsToCheck: Array<string>) => {
  var tokensToCheck: Array<Token> = [];

  if (symbolsToCheck.length === 0) {
    tokensToCheck = knownTokens;
  } else {
    symbolsToCheck.forEach((symbol) => {
      const token = knownTokens.find((token) => {
        token.symbol === symbol;
      });
      if (token) {
        tokensToCheck.push(token);
        console.info(tokensToCheck);
      }
    });
  }

  console.info(tokensToCheck);
  return tokensToCheck;
};

export const getTokenSymbolsInWallet = async (
  walletAddress: string,
  symbolsToCheck: Array<string> = [],
) => {
  walletAddress = await _getRawAddress(walletAddress);
  // allows recursive use of function
  const tokensToCheck = _getTokensForSymbols(symbolsToCheck);

  const balanceThreshold = 0;
  var tokensHeld = new Array<string>();
  const pushIfBalance = (symbol: string, balance: number) => {
    if (balance > balanceThreshold) {
      tokensHeld.push(symbol);
      console.info('pushed', tokensHeld);
    }
  };

  const ethBalanceInWei = await web3.eth.getBalance(walletAddress);
  const ethBalance = Number(web3.utils.fromWei(ethBalanceInWei, 'ether'));
  pushIfBalance('ETH', ethBalance);

  console.info('tokensToCheck', tokensToCheck);

  tokensToCheck.forEach(async (token) => {
    const contract: Contract = new web3.eth.Contract(
      erc20AbiJson,
      token.address,
    );
    const balance: number = await contract.methods
      .balanceOf(walletAddress)
      .call();
    console.info('token to check');
    console.info(token);
    console.info('contract', contract);
    console.info('balance', balance);

    pushIfBalance(token.symbol, balance);
  });
  console.info('final tokensHeld', tokensHeld);
  return tokensHeld;
};

export const getSharedTokens = async (walletAddresses: Array<string>) => {
  if (!walletAddresses) {
    return;
  }

  // recursively reduce
  var walletIndex = 0;
  var sharedTokensHeld: Array<string> = await getTokenSymbolsInWallet(
    walletAddresses[walletIndex],
  );
  console.info('sharedTokensHeld');
  console.info(sharedTokensHeld, walletAddresses[walletIndex]);

  while (walletIndex < walletAddresses.length) {
    sharedTokensHeld = await getTokenSymbolsInWallet(
      walletAddresses[walletIndex],
      sharedTokensHeld,
    );
    console.info('walletIndex', walletIndex);
    console.info(sharedTokensHeld);
    walletIndex++;
  }
  console.info(sharedTokensHeld);

  return sharedTokensHeld;
};

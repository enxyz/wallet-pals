// MVP check wallets by hand with
// https://etherscan.io/tokenholdings?a=[0x123...789xyz]
//

import { createAlchemyWeb3 } from '@alch/alchemy-web3';

// TODO: move to `.env `
const ethereum_mainnet_rpc: string = 'wss://eth-mainnet.alchemyapi.io/v2/JZwhf6Tk1cXqp-KdVkQzJN7m65uKcrxb';
// const ethereum_mainnet_rpc = process.env.REACT_APP_ALCHEMY_KEY;
console.log('ethereum_mainnet_rpc', ethereum_mainnet_rpc);

const web3 = createAlchemyWeb3(ethereum_mainnet_rpc);

// const web3 = new Web3(Web3.givenProvider || ethereum_mainnet_rpc);
const ens = web3.eth.ens;

import { erc20AbiJson } from '../contracts/json-interfaces';
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
  var tokens: Array<Token> = [];
  if (symbolsToCheck.length === 0) {
    tokens = knownTokens;
  } else {
    symbolsToCheck.forEach((symbol) => {
      const token: Token|undefined = tokens.find((token) => {token.symbol === symbol});
      if (token && token.symbol) {
        tokens.push(token);
      }
    });
  }

  console.log('exit _getTokensForSymbols, tokens', tokens)
  return tokens;
};

export const getTokenSymbolsInWallet = async (
  walletAddress: string,
  symbolsToCheck: Array<string>,
) => {
  console.log('enter getTokenSymbolsInWallet')

  walletAddress = await _getRawAddress(walletAddress);
  // allows recursive use of function
  const tokensToCheck = _getTokensForSymbols(symbolsToCheck);

  const balanceThreshold = 0;
  var tokensHeld = new Array<string>();
  const pushIfBalance = (symbol: string, balance: number) => {
    if (balance > balanceThreshold) {
      tokensHeld.push(symbol);
      console.info('pushed', symbol, balance, tokensHeld), walletAddress;
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

    pushIfBalance(token.symbol, balance);
  });
  console.info('final tokensHeld', tokensHeld);
  console.log('exit getTokenSymbolsInWallet')

  return tokensHeld;
};

export const getSharedTokens = async (walletAddresses: Array<string>, setSharedTokens: Function) => {
  if ((!walletAddresses) || (walletAddresses.length < 2)) {
    return;
  }

  // recursively reduce
  var walletIndex = 0;
  var sharedTokens: Array<string> = await getTokenSymbolsInWallet(
    walletAddresses[walletIndex], []
  );
  walletIndex++;

  while (walletIndex < walletAddresses.length) {
    sharedTokens = await getTokenSymbolsInWallet(
      walletAddresses[walletIndex],
      sharedTokens,
    );
    walletIndex++;
  }

  console.info('final sharedTokens');
  console.info(sharedTokens);
  setSharedTokens(sharedTokens);
  return sharedTokens;
};

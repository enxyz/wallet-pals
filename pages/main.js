// MVP check wallets by hand with
// https://etherscan.io/tokenholdings?a=[0x123...789xyz]
//

var ethereum_mainnet_rpc =
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

var Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || ethereum_mainnet_rpc);
const ens = web3.eth.ens;

import { erc20AbiJson } from '../contracts/json-interfaces.js';
import { tokens } from '../contracts/addresses.js';

const walletAddresses = [
  // '0x7D25CB84CdfBDAF9A35dF24Be0a854E4D9d96f9d', // MM_main
  'cameron.eth',
  'huh.eth',
];

async function _getTokens(walletAddress) {
  const tokenBalances = new Map();
  var ethBalance = await web3.eth.getBalance(walletAddress);
  ethBalance = web3.utils.fromWei(ethBalance, 'ether');
  tokenBalances.set('ETH', ethBalance);
  // TODO: put decimal in correct place for these too
  for (const [name, tokenAddress] of tokens) {
    const contract = new web3.eth.Contract(erc20AbiJson, tokenAddress);
    const tokenBalance = await contract.methods.balanceOf(walletAddress).call();
    tokenBalances.set(name, tokenBalance);
  }
  return tokenBalances;
}

async function getTokenBalances(_walletAddresses) {
  const walletBalances = new Map();
  for (const address of _walletAddresses) {
    var resolved_address = address; // allow for ens names like 'cam.eth'
    // check for '.' not '.eth' per https://docs.ens.domains/dapp-developer-guide/resolving-names
    if (address.includes('.')) {
      resolved_address = await ens.getAddress(address);
    }
    const balances = await _getTokens(resolved_address);
    walletBalances.set(address, balances);
  }
  return walletBalances;
}

function compareWallets(_walletBalances) {
  console.log('compareWallets');
  var allTokens = new Set();
  tokens.forEach(function (tokenAddress, tokenName) {
    allTokens.add(tokenName);
  });
  var sharedTokens = allTokens;
  _walletBalances.forEach(function (balances, wallet) {
    sharedTokens.forEach(function (token) {
      const balance = balances.get(token);
      if (balance <= 0) {
        sharedTokens.delete(token);
      }
    });
  });
  return sharedTokens;
}

function displayResults(wallets, sharedTokens) {
  console.log(wallets);
  console.log('shared the following tokens');
  console.log(sharedTokens);
}

function Main() {
  return <div>Check console</div>;
}

console.log('script');
var walletBalances = await getTokenBalances(walletAddresses);
console.log(walletBalances); // debug
var sharedTokens = compareWallets(walletBalances);
displayResults(walletAddresses, sharedTokens);

export default Main;

// Get count of a token in wallets

var ethereum_mainnet_rpc =
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
var Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || ethereum_mainnet_rpc);
const ens = web3.eth.ens;
import { erc20AbiJson } from '../contracts/json-interfaces.js';
import { wallets } from '../contracts/wallets.js';

// $ORANGE
// https://etherscan.io/token/0x1bBD79f1Ecb3f2cCC586A5E3A26eE1d1D2E1991f
export const token = '0x1bBD79f1Ecb3f2cCC586A5E3A26eE1d1D2E1991f';

async function handleEnsAddresses(wallet) {
  var resolvedAddress = wallet;
  // check for '.' not '.eth' per https://docs.ens.domains/dapp-developer-guide/resolving-names
  if (wallet.includes('.')) {
    resolvedAddress = await ens.getAddress(wallet);
  }
  return resolvedAddress;
}

// Given a token address and a list of wallets...
// return a map of token address to count of token
async function getTokenQuantity(wallets, token) {
  const contract = new web3.eth.Contract(erc20AbiJson, token);
  const tokensInWallets = new Array();
  await Promise.all(
    wallets.map(async (wallet) => {
      const resolvedAddress = await handleEnsAddresses(wallet);
      const tokenBalance = await contract.methods
        .balanceOf(resolvedAddress)
        .call();
      const tokenInWallet = new Object();
      tokenInWallet.wallet = wallet;
      tokenInWallet.tokenBalance = tokenBalance;
      tokensInWallets.push(tokenInWallet);
    }),
  );
  return tokensInWallets;
}

async function main() {
  const tokensInWallets = await getTokenQuantity(wallets, token);
  console.log('\n\n');
  console.log(JSON.stringify(tokensInWallets));
  console.log('\n\n');
}

await main();

// so website loads
export default function Main() {
  return <title>wallet-pals</title>;
}

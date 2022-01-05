// MVP check wallets by hand with
// https://etherscan.io/tokenholdings?a=[0x123...789xyz]
//

var Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
import { erc20AbiJson } from '../contracts/json-interfaces.ts';
import { myAddress } from '../_secrets/wallets.ts';

const tokenAddresses = [
  '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0', // matic
];

const tokenBalances = new Map();
for (let tokenAddress of tokenAddresses) {
  const contract = new web3.eth.Contract(erc20AbiJson, tokenAddress);
  const tokenBalance = await contract.methods.balanceOf(myAddress).call();
  // tokenBalances.set(contract, tokenBalance);
}

function Main() {
  return <div>Check console</div>;
}
export default Main;

import type { NextPage } from 'next';
import { useState } from 'react';
import '../styles/Home.module.css';
import ActionButton from '../components/ActionButton';
import FormGroup from '../components/FormGroup';
import TextArea from '../components/TextArea';
import Label from '../components/Label';
import Title from '../components/Title';
import {
  getSharedTokens,
  getTokenSymbolsInWallet,
} from '../utils/checkWallets';
import { Token } from '../types/types';

const Home: NextPage = () => {
  const [walletAddresses, setWalletAddresses] = useState<string>();
  const [buttonStatus, setButtonStatus] = useState('Check Wallets');
  const [tokens, setTokens] = useState('Check Wallets');
  const [sharedTokens, setSharedTokens] = useState('None found');

  const addressesInputVerificationWithUI = () => {
    console.info('addressesInputVerificationWithUI');
    if (!walletAddresses) {
      alert('Input addresses to check');
      return false;
    }

    // allow both raw and ens addresses
    const addresses = walletAddresses.split(/\s/).filter((item) => item !== '');
    if (addresses.length < 2) {
      alert('Enter at least two addresses to compare');
      return false;
    }
    addresses.every((address) => {
      // check for '.' not '.eth' per https://docs.ens.domains/dapp-developer-guide/resolving-names
      const regEx = /(^\s?\S+.|^\s?0x[a-f0-9]+)/gi;
      if (!address.match(regEx)) {
        alert(
          "Address should be of format: 'some-name.eth' or '0xc123...234' (where ... is an alphanumeric string)",
        );
        return false;
      }
    });
    setButtonStatus('Checking...');
    console.info('addresses');
    console.info(addresses);
    return addresses;
  };

  const buttonPressed = async () => {
    console.log('buttonPressed');

    const addresses = addressesInputVerificationWithUI();
    if (!addresses) return;
    const sharedTokens = await getSharedTokens(addresses);
    setSharedTokens(sharedTokens);
    setButtonStatus('Checked');

    console.log(sharedTokens);

    if (sharedTokens && sharedTokens.length > 0) {
      console.log('result happy');
      console.log(sharedTokens);
      console.log(sharedTokens.length > 0);
    } else {
      console.log('result sorry');
      console.log(sharedTokens);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-5/12">
        <div className="mb-12">
          <div className="mb-3">
            <Title>Check Wallets</Title>
          </div>
          <p className="text-sm">
            Enter wallets to check. The wallets will be checked for shared
            tokens.
          </p>
        </div>
        <form>
          <FormGroup>
            <Label>Wallet addresses</Label>
            <TextArea
              onChange={(event) => setWalletAddresses(event.target.value)}
            ></TextArea>
          </FormGroup>
          <div className="max-w-fit">
            <ActionButton onClick={buttonPressed}>{buttonStatus}</ActionButton>
          </div>
        </form>

        <div className="my-14">
          <div className="mb-3">
            <Title>Shared Tokens</Title>
          </div>
          <p className="text-sm">{sharedTokens}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

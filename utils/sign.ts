import { providers, utils } from 'ethers';

export const triggerSigning = async (actionText: string) => {
  const clientProvider = new providers.Web3Provider(window.ethereum);
  const signer = clientProvider.getSigner();
  const signerAddress = await signer.getAddress();

  const nonce = utils.hexlify(utils.randomBytes(32));
  const message = `${actionText} Sign this message to confirm. This won't cost you any gas.\n\nIssued At: ${new Date().toISOString()}\nTo: ${signerAddress}\n\nHere's some random and unguessable bits we thought you might enjoy: ${nonce}`;
  const rawSignature = await signer.signMessage(message);

  return [message, rawSignature];
};

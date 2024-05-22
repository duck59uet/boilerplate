import { Account, Ed25519PrivateKey, Ed25519PublicKey, Ed25519Signature } from '@aptos-labs/ts-sdk';
import { HexString } from 'aptos';

export const signMessage =
  (logger) =>
  async (
    privateKeyVerifier: string,
    owner: string,
    name: string,
    symbol: string,
    logo_uri: string,
    project_uri: string,
    // nonce: string,
  ) => {
    try {
      const message = `APTOS\\nmessage: @${owner}${name}${symbol}${logo_uri}${project_uri}\\nnonce: 0`;
      const edPk = new Ed25519PrivateKey(
        new HexString(privateKeyVerifier).toString(),
      );

      const signature = await edPk.sign(stringToHex(message)).toUint8Array();
      return signature;
    } catch (error) {
      logger.log('error', error);
      return null;
    }
  };

export const stringToHex = (message: string) => {
  return message
    .split('')
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export const standardizeAddress = (address: string): string => {
  // Convert the address to lowercase
  const lowercaseAddress = address.toLowerCase();
  // Remove the "0x" prefix if present
  const addressWithoutPrefix = lowercaseAddress.startsWith('0x')
    ? lowercaseAddress.slice(2)
    : lowercaseAddress;
  // Pad the address with leading zeros if necessary
  // to ensure it has exactly 64 characters (excluding the "0x" prefix)
  const addressWithPadding = addressWithoutPrefix.padStart(64, '0');
  // Return the standardized address with the "0x" prefix
  return `0x${addressWithPadding}`;
};

export function isValidUserSignature(
    address: string,
    message: string,
    signature: string,
    publicKey: string,
  ): boolean {
    const ed25519PublicKey = new Ed25519PublicKey(publicKey);
    const ed25519Signature = new Ed25519Signature(signature);
    const accountAddress = Account.authKey({ publicKey: ed25519PublicKey }).derivedAddress().toString();
    if (accountAddress !== address) {
      throw new Error('Invalid wallet address');
    }
    const verify = ed25519PublicKey.verifySignature({
      message: stringToHex(message),
      signature: ed25519Signature,
    });
    return verify;
  }
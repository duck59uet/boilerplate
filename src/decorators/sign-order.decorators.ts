import { Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { HexString } from 'aptos';

export const signMessage =
    (logger) =>
        async (
            privateKeyVerifier: string,
            name: string,
            symbol: string,
            logo_uri: string,
            project_uri: string,
            nonce: string,
        ) => {
            try {

                const message = `APTOS\\nmessage: ${name}${symbol}${logo_uri}@${project_uri}\\nnonce: ${nonce}`;
                const edPk = new Ed25519PrivateKey(new HexString(privateKeyVerifier).toString());

                const signature = await edPk.sign(stringToHex(message)).toString();
                return {
                    signature,
                };
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

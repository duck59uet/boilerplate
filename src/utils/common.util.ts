import { isNil, omitBy } from 'lodash';
import {
  Pubkey,
  pubkeyToAddress,
} from '@cosmjs/amino';
import { sha256 } from '@cosmjs/crypto';
import { toBech32 } from '@cosmjs/encoding';
import { PathLike } from 'node:fs';
import { FileHandle, readFile } from 'node:fs/promises';

import { EthermintHelper } from '../chains/ethermint/ethermint.helper';

export class CommonUtil {
  /**
   * jsonReader
   * @param filePath
   * @returns
   */
  static async jsonReader<T>(filePath: PathLike | FileHandle): Promise<T> {
    const content = await readFile(filePath, 'utf8');
    const object = JSON.parse(content) as T;
    return object;
  }

  /**
   * getStrProp https://stackoverflow.com/a/70031969/8461456
   * @param o
   * @param prop
   * @returns
   */
  public static getStrProp(o: unknown, prop: string): string {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const p = (o as any)[prop];
      if (typeof p === 'string') {
        return p;
      }
    } catch {
      // ignore
    }
    return undefined;
  }

  /**
   * Calculate address from public key
   * @param pubkey public key
   * @returns address string
   */
  public static pubkeyToAddress(pubkey: Pubkey, prefix: string): string {
    if (prefix === 'evmos' || prefix === 'canto') {
      const ethermintHelper = new EthermintHelper();
      const pubkeyAmino =
        ethermintHelper.encodeAminoPubkeySupportEthermint(pubkey);
      const rawAddress = sha256(pubkeyAmino).slice(0, 20);
      const address = toBech32(prefix, rawAddress);
      return address;
    }

    /**
     * Another way to get bech32 address:
     * const pubkeyData = encodeAminoPubkey(pubkey);
     * const rawAddress = sha256(pubkeyData).slice(0, 20);
     * toBech32(prefix, rawAddress);
     */

    return pubkeyToAddress(pubkey, prefix);
  }

  /**
   * https://stackoverflow.com/a/54974076/8461456
   * @param arr
   * @returns boolean
   */
  public static checkIfDuplicateExists(arr: unknown[]): boolean {
    return new Set(arr).size !== arr.length;
  }

  /**
   *
   * @param strArr
   * @returns string[]
   */
  public filterEmptyInStringArray(strArr: string[]): string[] {
    return strArr.filter((e) => e !== '');
  }

  omitByNil = (obj: unknown) => omitBy(obj, isNil);
}

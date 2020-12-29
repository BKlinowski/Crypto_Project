import { BitConverter, copyArray, splitArrayIntoBlocks, XOR, rcTo1d, xyTo1d, roteteArray, print1dArray, print1dArrayAs2d, circularLeftShift32 } from "../scripts/utils";

class Chacha20 {



  /**
   * CHACHA20 encryption
   * @param {string} pt_string
   * @param {string} key_string
   * @param {string} nonce_string
   * @returns {byte[]} ciphertext in bytes
   */
  static encrypt(pt_string, key_string, nonce_string) {
    return BitConverter.fromString("E").toBytes();
  }
  /**
   * CHACHA20 decryption
   * @param {byte[]} ct_bytes
   * @param {string} key_string
   * @param {string} nonce_string
   * @returns {string} plaintext as string
   */
  static decrypt(ct_bytes, key_string, nonce_string) {
    return "D";
  }
}

export default Chacha20;
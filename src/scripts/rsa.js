/**
 * RSA
 *
 * Usage:
 *
 *  -key generation: RSA.generateKeys(keyLenInBits) -> {public: <publicKey>, private: <privateKey>}
 *
 *  -encryption: RSA.encrypt(plaintext, key) -> ciphertext
 *
 *  -decryption: RSA.decrypt(ciphertext, key) -> plaintext
 *
 * Useful URLs:
 * https://eduinf.waw.pl/inf/alg/001_search/0067.php
 * https://incolumitas.com/2018/08/12/finding-large-prime-numbers-and-rsa-miller-rabin-test/
 */

import { BitConverter } from "./bitUtils";

function BigInt(x) {
  return window.BigInt(x);
}
class RSA {
  static randomBigInt(sizeInBytes = 32) {
    let ret = 0n;

    let i = 0;
    for (; i < sizeInBytes - 6; i += 6) {
      ret <<= BigInt(12 * 4);
      ret += BigInt(Math.floor(Math.random() * 0xffffffffffff));
    }
    for (; i < sizeInBytes; i += 1) {
      ret <<= BigInt(2 * 4);
      ret += BigInt(Math.floor(Math.random() * 0xff));
    }

    return ret;
  }
  static powerModulo(x, k, p) {
    let ret = 1n;

    let str = k.toString(2);
    for (let c of str) {
      ret = ret * ret;
      if (c == "1") {
        ret = ret * x;
      }
      ret %= p;
    }

    return ret;
  }
  static miller_rabin_primality_test(p, primeLenInBytes, s = 5) {
    if (p == 2n) {
      //2 is the only prime that is even
      return true;
    }
    if (!(p & 1n)) {
      //# n is a even number and can't be prime
      return false;
    }

    let p1 = p - 1n;
    let u = 0n;
    let r = p1; // p-1 = 2**u * r

    while (r % 2n == 0n) {
      r >>= 1n;
      u += 1n;
    }

    // at this stage p-1 = 2**u * r  holds
    //assert p-1 == 2**u * r
    if (p - 1n != 2n ** u * r) {
      console.log("error");
    }
    function witness(a) {
      /*
            Returns: True, if there is a witness that p is not prime.
                    False, when p might be prime
            */
      let z = RSA.powerModulo(a, r, p);
      if (z == 1n) {
        return false;
      }

      for (let i = 0n; i < u; ++i) {
        z = RSA.powerModulo(a, 2n ** i * r, p);
        if (z == p1) {
          return false;
        }
      }

      return true;
    }
    for (let j = 0; j < s; ++j) {
      let a = (this.randomBigInt(primeLenInBytes) % (p - 2n - 2n + 1n)) + 2n;

      if (witness(a)) {
        return false;
      }
    }
    return true;
  }

  static isPrime(number) {
    if (number == 1) return false;
    if (number == 2) return true;

    let half = number / 2n;
    for (let i = 2n; i <= half; ++i) {
      if (number % i == 0) {
        return false;
      }
    }
    return true;
  }
  static nwd(a, b) {
    if (b == 0) {
      return a;
    } else {
      return this.nwd(b, a % b);
    }
  }
  static modInverse(a, b) {
    let u = 1n;
    let w = a;
    let x = 0n;
    let z = b;
    let q;
    while (w) {
      if (w < z) {
        q = u;
        u = x;
        x = q;
        q = w;
        w = z;
        z = q;
      }
      q = w / z;
      u -= q * x;
      w -= q * z;
    }
    if (z == 1) {
      if (x < 0n) x += b;
      return x;
    } else return -1n;
  }

  static generateKeys(keyLenInBits = 256) {
    let primeLenInBytes = keyLenInBits / 8 / 2;

    let p = this.randomBigInt(primeLenInBytes);
    let q = this.randomBigInt(primeLenInBytes);

    let howmany = 0;
    while (!this.miller_rabin_primality_test(p)) {
      p = this.randomBigInt(primeLenInBytes);
      console.log(p);
      howmany++;
    }
    
    while (!this.miller_rabin_primality_test(q)) {
      q = this.randomBigInt(primeLenInBytes);
      console.log(q);
      howmany++;
    }

    console.log(howmany);
    let n = p * q;
    let fi = (p - 1n) * (q - 1n);

    let e = 65537n;
    let d = this.modInverse(e, fi);

    return {
      public: `(${n}, ${e})`,
      private: `(${n}, ${d})`,
    };
  }

  /**
   * RSA encryption
   * @param {string} message
   * @param {key} key =RSA.GenerateKeys().public
   * @returns {byte[]} ciphertext in bytes
   */
  static encrypt(message, key) {
    let messageBytes = BitConverter.fromString(message).toBytes();
    let output = [];

    key = key.substr(1, key.length - 2);
    key = key.split(", ");
    let keyN = BigInt(key[0]);
    let keyE = BigInt(key[1]);

    for (let b of messageBytes) {
      let tmp = this.powerModulo(BigInt(b), keyE, keyN);
      output.push(tmp);
    }
    //c = t^e mod n

    return output;
  }
  /**
   * RSA decryption
   * @param {bytes[]} ciphertext
   * @param {key} key
   * @returns {string} plaintext as string
   */
  static decrypt(ciphertext, key) {
    console.log(ciphertext, key);
    let ciphertextBytes = ciphertext;
    let output = [];

    key = key.substr(1, key.length - 2);
    key = key.split(", ");
    let keyN = BigInt(key[0]);
    let keyD = BigInt(key[1]);

    for (let b of ciphertextBytes) {
      let tmp = this.powerModulo(BigInt(b), keyD, keyN);
      output.push(Number(tmp));
    }
    //c = t^e mod n

    return BitConverter.fromBytes(output).toString();
  }
}

export default RSA;

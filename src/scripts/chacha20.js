/**
 * Chacha20
 *
 * Usage:
 *
 *  -encryption: Chacha20.encrypt(plaintext, key, nonce) -> ciphertext
 *
 *  -decryption: Chacha20.decrypt(ciphertext, key, nonce) -> plaintext
 *
 * Documentation used: https://tools.ietf.org/html/rfc7539
 */
class Chacha20 {

  static circularLeftShift32(n, amount){
    return ( (n << amount) | (n >> (32-amount)) ) & 0xffffffff;
  }
  static strToInt32Arr(str){
    while(str.length % 4 !== 0){
      str += '\u0000';
    }

    let ret = [];
    for(let i = 0; i < str.length; i += 4){
      ret.push(
          str.charCodeAt(i + 0) << 24
        | str.charCodeAt(i + 1) << 16
        | str.charCodeAt(i + 2) << 8
        | str.charCodeAt(i + 3) << 0
      );
    }

    return ret;
  }
  static int32ArrToStr(arr){
    let ret = "";
    
    for(let x of arr){
      ret += String.fromCharCode(x >> 24 & 0xff);
      ret += String.fromCharCode(x >> 16 & 0xff);
      ret += String.fromCharCode(x >>  8 & 0xff);
      ret += String.fromCharCode(x >>  0 & 0xff);
    }
    
    return ret;
  }
  static int32ArrToInt8Arr(arr){
    let ret = [];
    for(let x of arr){
      ret.push(x >> 24 & 0xff);
      ret.push(x >> 16 & 0xff);
      ret.push(x >>  8 & 0xff);
      ret.push(x >>  0 & 0xff);
    }
    return ret;
  }
  static int8ToInt32Arr(arr){
    let ret = [];
    for(let i = 0; i < arr.length; i += 4){
      ret.push(
          arr[i + 0] << 24
        | arr[i + 1] << 16
        | arr[i + 2] << 8
        | arr[i + 3] << 0
      );
    }
    return ret;
  }
  static addArrays(arrA, arrB){
    let ret = [];
    for(let i = 0; i < Math.min(arrA.length, arrB.length); ++i){
      ret.push(arrA[i] + arrB[i]);
    }
    return ret;
  }
  static xorArrays(arrA, arrB){
    let ret = [];
    for (let i = 0; i < Math.min(arrA.length, arrB.length); ++i) {
      ret.push(arrA[i] ^ arrB[i]);
      //console.log(arrA[i], '^', arrB[i], '=', arrA[i] ^ arrB[i]);
    }
    return ret;
  }

	static quarterRound(state, a, b, c, d){
		state[a] += state[b]; state[d] ^= state[a]; state[d] = this.circularLeftShift32(state[d], 17);
		state[c] += state[d]; state[b] ^= state[c]; state[b] = this.circularLeftShift32(state[b], 12);
		state[a] += state[b]; state[d] ^= state[a]; state[d] = this.circularLeftShift32(state[d], 8);
		state[c] += state[d]; state[b] ^= state[c]; state[b] = this.circularLeftShift32(state[b], 7);
	}

  static inner_block(state){
    this.quarterRound(state, 0, 4, 8,12)
    this.quarterRound(state, 1, 5, 9,13)
    this.quarterRound(state, 2, 6,10,14)
    this.quarterRound(state, 3, 7,11,15)
    this.quarterRound(state, 0, 5,10,15)
    this.quarterRound(state, 1, 6,11,12)
    this.quarterRound(state, 2, 7, 8,13)
    this.quarterRound(state, 3, 4, 9,14)
  }
  static block(key, counter, nonce){
    //state = constants | key | counter | nonce
    let state = this.strToInt32Arr("expand 32-byte k")
      .concat( this.strToInt32Arr(key) )
      .concat( [counter] )
      .concat( this.strToInt32Arr(nonce) )
    ;
    
    let working_state = state.slice();
    for(let i = 1; i <= 10; ++i){
      this.inner_block(working_state);
    }
    
    return this.addArrays(state, working_state);
  }

  /**
   * Chacha20 encryption
   * @param {string} pt_string
   * @param {string} key_string
   * @param {string} nonce_string
   * @returns {byte[]} ciphertext in bytes
   */
  static encrypt(pt_string, key_string, nonce_string) {
    while(pt_string.length % 64 != 0){
      pt_string += '\u0000';
    }

    let counter = 0;
    let encrypted_message = [];
    let plaintext = this.strToInt32Arr(pt_string);
    for(let i = 0; i < Math.floor(plaintext.length / 16); ++i){
      let key_stream = this.block(key_string, counter + i, nonce_string);
      let b = plaintext.slice(i * 16, i * 16 + 16);
      console.log(b, key_stream);
      encrypted_message = encrypted_message.concat(
        this.int32ArrToInt8Arr(
          this.xorArrays(b, key_stream)
       )
      );
    }
    return encrypted_message;
  }
  /**
   * Chacha20 decryption
   * @param {byte[]} ct_bytes
   * @param {string} key_string
   * @param {string} nonce_string
   * @returns {string} plaintext as string
   */
  static decrypt(ct_bytes, key_string, nonce_string) {
    while(ct_bytes.length % 64 != 0){
      ct_bytes.push(0);
    }

    let counter = 0;
    let decrypted_message = "";
    let ciphertext = this.int8ToInt32Arr(ct_bytes);
    for(let i = 0; i < Math.floor(ciphertext.length / 16); ++i){
      let key_stream = this.block(key_string, counter + i, nonce_string);
      let b = ciphertext.slice(i * 16, i * 16 + 16);
      decrypted_message += this.int32ArrToStr(
          this.xorArrays(b, key_stream)
      );
    }
    return decrypted_message;
  }
}

export default Chacha20;
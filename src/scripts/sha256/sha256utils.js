export default class Utils {
  constructor(text) {
    this.text = text;
    this.charCodes = Utils.toCharCodes(text);
    this.bits = Utils.toBits(this.charCodes);
  }

  static toCharCodes(text) {
    const tempArr = [];
    for (let i = 0; i < text.length; i++) {
      tempArr.push(text.charCodeAt(i));
    }
    return tempArr;
  }

  static toBits(charCodes) {
    let bits = [];
    for (let char of charCodes) {
      let tempString = char.toString(2);
      tempString = tempString.padStart(8, "0");
      bits.push(tempString.split("").map((char) => +char));
    }
    return bits.flat();
  }

  static shiftRight(bits, toShift) {
    let bitsCopy = [...bits];
    let bitsLength = bitsCopy.length;
    bitsCopy = parseInt(bitsCopy.join(""), 2);
    bitsCopy = bitsCopy >>> toShift;
    bitsCopy = bitsCopy
      .toString(2)
      .padStart(bitsLength)
      .split("")
      .map((char) => +char);
    return bitsCopy;
  }

  static rotRight(bits, toRotate) {
    let bitsCopy = [...bits];
    for (let i = 0; i < toRotate; i++) {
      bitsCopy.unshift(bitsCopy[bitsCopy.length - 1]);
      bitsCopy.pop();
    }
    return bitsCopy;
  }

  static XOR(...bitsArr) {
    let result = bitsArr[0];
    for (let i = 0; i < bitsArr.length - 1; i++) {
      for (let j = 0; j < bitsArr[i].length; j++) {
        result[j] = result[j] ^ bitsArr[i + 1][j];
      }
    }
    return result;
  }

  static addition(mod, ...bitsArr) {
    let result = 0;
    for (let bits of bitsArr) {
      bits = [...bits];
      result += parseInt(bits.join(""), 2);
      result %= 2 ** mod;
    }

    return result
      .toString(2)
      .padStart(32, "0")
      .split("")
      .map((char) => +char);
  }

  static sigma0(bits) {
    let bitsCopy = [...bits];
    let rot7 = Utils.rotRight(bitsCopy, 7);
    let rot18 = Utils.rotRight(bitsCopy, 18);
    let shr3 = Utils.shiftRight(bitsCopy, 3);
    return Utils.XOR(rot7, rot18, shr3);
  }

  static sigma1(bits) {
    let bitsCopy = [...bits];
    let rot17 = Utils.rotRight(bitsCopy, 17);
    let rot19 = Utils.rotRight(bitsCopy, 19);
    let shr10 = Utils.shiftRight(bitsCopy, 10);
    return Utils.XOR(rot17, rot19, shr10);
  }

  static bigSigma0(bits) {
    let bitsCopy = [...bits];
    let rot2 = Utils.rotRight(bitsCopy, 2);
    let rot13 = Utils.rotRight(bitsCopy, 13);
    let shr22 = Utils.rotRight(bitsCopy, 22);
    return Utils.XOR(rot2, rot13, shr22);
  }

  static bigSigma1(bits) {
    let bitsCopy = [...bits];
    let rot6 = Utils.rotRight(bitsCopy, 6);
    let rot11 = Utils.rotRight(bitsCopy, 11);
    let shr25 = Utils.rotRight(bitsCopy, 25);
    return Utils.XOR(rot6, rot11, shr25);
  }

  static choice(x, y, z) {
    let xCopy = [...x];
    let yCopy = [...y];
    let zCopy = [...z];
    let result = [];
    for (let i = 0; i < x.length; i++) {
      xCopy[i] == 1 ? result.push(yCopy[i]) : result.push(zCopy[i]);
    }
    return result;
  }

  static majority(x, y, z) {
    let result = [];
    for (let i = 0; i < x.length; i++) {
      x[i] + y[i] + z[i] > 1 ? result.push(1) : result.push(0);
    }
    return result;
  }

  addShaPadding(n) {
    let messageLength = this.bits.length
      .toString(2)
      .padStart(64, "0")
      .split("")
      .map((char) => +char);
    this.bits.push(1);
    const addZeros = n * 512 - this.bits.length - 64;
    for (let i = 0; i < addZeros; i++) {
      this.bits.push(0);
    }
    this.bits.push(messageLength);
    this.bits = this.bits.flat();
  }

  static hex2bin(hex) {
    return hex
      .toString(2)
      .padStart(32, "0")
      .split("")
      .map((char) => +char);
  }

  static bin2hex(bits) {
    let bitsCopy = [...bits];
    return parseInt(bitsCopy.toString().replaceAll(",", ""), 2).toString(16);
  }
}

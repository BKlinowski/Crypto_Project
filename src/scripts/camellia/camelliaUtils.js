export default class Utils {
  constructor(text, key) {
    this.text = text;
    this.charCodes = Utils.toCharCodes(text);
    this.bits = Utils.toBits(this.charCodes);
    this.keyCharCodes = Utils.toCharCodes(key);
    this.keyInBits = Utils.toBits(this.keyCharCodes);
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

  static hex2bin(hex) {
    let hexCopy = [...hex];
    let bits = [];
    for (let i = 0; i < hexCopy.length; i += 1) {
      bits.push(parseInt(hexCopy[i], 16).toString(2).padStart(4, "0"));
    }
    // parseInt(bitsCopy.toString().replaceAll(",", ""), 2).toString(16)
    return bits
      .join("")
      .split("")
      .map((char) => +char);
  }

  static bin2hex(bits) {
    let bitsCopy = [...bits];
    let text = "";
    let bitsCopyString = bitsCopy.toString().replaceAll(",", "");
    for (let i = 0; i < bitsCopyString.length; i += 4) {
      text += parseInt(bitsCopyString.slice(i, i + 4), 2).toString(16);
    }
    return text;
  }

  static hexToString(hexCode) {
    let text = "";
    for (let i = 0; i < hexCode.length; i += 2) {
      const decimalValue = parseInt(hexCode.slice(i, i + 2), 16);
      text += String.fromCharCode(decimalValue);
    }
    return text;
  }

  static numberToBits(val, padding) {
    let bits = [];
    let tempString = val.toString(2);
    tempString = tempString.padStart(padding, "0");
    bits.push(tempString.split("").map((char) => +char));
    return bits.flat();
  }

  static bitsToNumber(bits) {
    let bitsCopy = [...bits];
    bitsCopy = bitsCopy.join("");
    const number = parseInt(bitsCopy, 2);
    return number;
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

  static rotLeft(bits, toRotate) {
    let bitsCopy = [...bits];
    for (let i = 0; i < toRotate; i++) {
      bitsCopy.push(bitsCopy[i]);
      bitsCopy.shift();
    }
    return bitsCopy;
  }

  static XOR(...bitsArr) {
    let bitsArrCopy = [...bitsArr];
    let result = bitsArrCopy[0].slice();
    for (let i = 0; i < bitsArrCopy.length - 1; i++) {
      for (let j = 0; j < bitsArrCopy[i].length; j++) {
        result[j] = result[j] ^ bitsArrCopy[i + 1][j];
      }
    }
    return result;
  }

  static AND(...bitsArr) {
    let bitsArrCopy = [...bitsArr];
    let result = bitsArr[0].slice();
    for (let i = 0; i < bitsArrCopy.length - 1; i++) {
      for (let j = 0; j < bitsArrCopy[i].length; j++) {
        result[j] = result[j] & bitsArrCopy[i + 1][j];
      }
    }
    return result;
  }

  static OR(...bitsArr) {
    let bitsArrCopy = [...bitsArr];
    let result = bitsArr[0].slice();
    for (let i = 0; i < bitsArrCopy.length - 1; i++) {
      for (let j = 0; j < bitsArrCopy[i].length; j++) {
        result[j] = result[j] | bitsArrCopy[i + 1][j];
      }
    }
    return result;
  }

  /*   static addition(mod, ...bitsArr) {
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

  addCamelliaPadding(n) {
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
  } */
}

export default class Utils {
  constructor(text) {
    this.text = text;
    this.words = Utils.convertToArrayOfWords(text);
  }

  static convertToArrayOfWords(string) {
    let wordCount;
    let messLen = string.length;
    let numberOfWords = ((messLen + 8 - ((messLen + 8) % 64)) / 64 + 1) * 16;
    let wordArray = new Array(numberOfWords - 1);
    let bytePosition = 0;
    let byteCount = 0;
    while (byteCount < messLen) {
      wordCount = (byteCount - (byteCount % 4)) / 4;
      bytePosition = (byteCount % 4) * 8;
      wordArray[wordCount] = wordArray[wordCount] | (string.charCodeAt(byteCount) << bytePosition);
      byteCount++;
    }
    wordCount = (byteCount - (byteCount % 4)) / 4;
    bytePosition = (byteCount % 4) * 8;
    wordArray[wordCount] = wordArray[wordCount] | (0x80 << bytePosition);
    wordArray[numberOfWords - 2] = messLen << 3;
    wordArray[numberOfWords - 1] = messLen >>> 29;
    return wordArray;
  }

  static WordToHex(value) {
    let val = "";
    let valTemp = "";
    let byte;
    for (let count = 0; count < 4; count++) {
      byte = (value >>> (count * 8)) & 255;
      valTemp = "0" + byte.toString(16);
      val = val + valTemp.substr(valTemp.length - 2, 2);
    }
    return val;
  }

  static rotLeft(val, toShift) {
    return (val << toShift) | (val >>> (32 - toShift));
  }

  static addition(x, y) {
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
}

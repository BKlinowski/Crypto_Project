/**
 * Convert string/bytes/bits into string/bytes/bits
 * Ex. BitConverter.fromString('AAAABBBBCCCCDDDD').toBytes() - converts string into bytes
 */
export class BitConverter {
  bytesData = [];

  static fromString(str) {
    let ret = new BitConverter();

    for (let i = 0; i < str.length; ++i) {
      let code = str.charCodeAt(i);
      ret.bytesData.push(code);
    }

    return ret;
  }
  static fromBytes(bytesArray) {
    if (typeof bytesArray === "number") {
      bytesArray = [bytesArray];
    }

    let ret = new BitConverter();
    ret.bytesData = bytesArray;
    return ret;
  }
  static fromBits(bitsArray) {
    if (typeof bitsArray === "number") {
      bitsArray = [bitsArray];
    }
    let bytesArray = [];

    //TODO: optimize
    let bits2add = (8 - (bitsArray.length % 8)) % 8;
    for (let i = 0; i < bits2add; ++i) {
      bitsArray.splice(0, 0, 0);
    }

    for (let i = 0; i < bitsArray.length; i += 8) {
      let b = 0;
      for (let j = 0; j < 8; ++j) {
        b |= (bitsArray[i + j] & 1) << (7 - j);
      }
      bytesArray.push(b);
    }

    return this.fromBytes(bytesArray);
  }

  //==============================================
  addPadding(
    padding,
    func = (i, toAdd) => {
      return 0;
    }
  ) {
    let toAdd = (padding - (this.bytesData.length % padding)) % padding;
    for (let i = 0; i < toAdd; ++i) {
      this.bytesData.push(func(i, toAdd));
    }
  }
  //==============================================

  string() {
    let ret = "";

    ret = "";
    for (let i = 0; i < this.bytesData.length; ++i) {
      let char = String.fromCharCode(this.bytesData[i]);
      ret += char;
    }

    return ret;
  }
  bytes() {
    return this.bytesData;
  }
  bits() {
    let ret = [];
    let bytes = this.bytes();

    for (let i = 0; i < bytes.length; ++i) {
      for (let j = 7; j >= 0; --j) {
        /*  console.log(
          `Right: ${bytes[i] & (1 << j)} and full ${(bytes[i] & (1 << j)) >> j}`
        ); */

        ret.push((bytes[i] & (1 << j)) >> j);
      }
    }

    return ret;
  }

  toString() {
    return this.string();
  }
  toHexString() {
    let ret = "";
    for (let i = 0; i < this.bytesData.length; ++i) {
      let toAdd = this.bytesData[i].toString(16);
      if (toAdd.length < 2) toAdd = "0" + toAdd;
      ret += toAdd;
    }
    return ret;
  }
  toBytes() {
    return this.bytes();
  }
  toBits() {
    return this.bits();
  }
}

//=======================================================================

/**
 * Returns a copy of the array. By value not by reference
 * @param {array} array
 */
export function copyArray(array) {
  return array.slice();
}

/**
 * Splits the array into blocks of a given size
 * @param {array} array
 * @param {int} blockSize
 */
export function splitArrayIntoBlocks(array, blockSize) {
  let ret = [];

  for (let i = 0; i < array.length; i += blockSize) {
    let blockID = i / blockSize;
    ret[blockID] = [];
    for (let j = 0; j < blockSize; ++j) {
      ret[blockID][j] = array[i + j] || 0;
    }
  }

  return ret;
}

/**
 * XOR almost anything. Currently supports arrays (1d, 2d) and integers
 * @param {*} a
 * @param {*} b
 */
export function XOR(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    //XOR numbers
    return a ^ b;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    let dimension = 1;

    let tmpA = a,
      tmpB = b;
    for (let i = 0; i < 10; ++i) {
      if (
        typeof tmpA[0] !== "undefined" &&
        typeof tmpB[0] !== "undefined" &&
        Array.isArray(tmpA[0]) &&
        Array.isArray(tmpB[0])
      ) {
        dimension += 1;
        tmpA = tmpA[0];
        tmpB = tmpB[0];
      }
    }

    if (dimension === 1) {
      //XOR 1d arrays
      if (a.length != b.length) {
        throw Error("Cannot XOR: a.length != b.length");
      }

      let ret = copyArray(a);
      for (let i = 0; i < ret.length; ++i) {
        let tmp = a[i] ^ b[i];
        tmp &= 0xff;
        ret[i] = tmp;
      }

      return ret;
    } else if (dimension === 2) {
      //XOR 2d arrays
      throw Error("XORing 2d arrays is not yet supported!"); //TODO: do it for any dim array
    } else {
      throw Error("Currently XOR doesn't support " + dimension + "d arrays!");
    }
  } else {
    //XOR default
    console.log("WARNING:", "XORing unsupported types!");
    return a ^ b;
  }
}

var default2dWidth = 4;
/**
 * Converts row column coordinates into 1d array address
 * @param {int} r
 * @param {int} c
 * @param {int} width
 */
export function rcTo1d(r, c, width = default2dWidth) {
  return c + r * width;
}
/**
 * Converts x y coordinates into 1d array address
 * @param {int} x
 * @param {int} y
 * @param {int} width
 */
export function xyTo1d(x, y, width = default2dWidth) {
  return x + y * width;
}

export function roteteArray(array, width = default2dWidth) {
  for (let j = 1; j < width; ++j) {
    for (let i = 0; i < j; ++i) {
      let tmpA = array[rcTo1d(i, j)];
      let tmpB = array[rcTo1d(j, i)];
      array[rcTo1d(j, i)] = tmpA;
      array[rcTo1d(i, j)] = tmpB;
    }
  }

  return array;
}

/**
 * prints 1d array
 * @param {array} array
 * @param {int} base
 */
export function print1dArray(array, base = 16) {
  let str2print = "";
  for (let i = 0; i < array.length; ++i) {
    str2print += " " + array[i].toString(base);
  }
  console.log(str2print);
}
/**
 * prints 2d array
 * @param {array} array
 * @param {int} base
 */
export function print1dArrayAs2d(array, base = 16, width = default2dWidth) {
  let str2print = "";
  for (let i = 0; i < array.length; ++i) {
    if (i != 0) {
      if (i % width == 0) str2print += "\n";
      else str2print += " ";
    }
    str2print += array[i].toString(base);
  }
  console.log(str2print);
}

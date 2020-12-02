import Utils from "./camelliaUtils";

class Camellia {
  constructor(key) {
    this.data = new Utils("asda", key);
    this.sigma1 = [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1];
    this.sigma2 = [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0];
    this.sigma3 = [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0];
    this.sigma4 = [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0];
    this.sigma5 = [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1];
    this.sigma6 = [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1];
    this.subkeys = [];
    this.kwkeys = [];
    this.klkeys = [];
    this.createSubkeys();
  }

  createSubkeys() {
    // this.data = new Utils("asda", "mojtestowykluczdocameliijestgiga");
    console.log(this.data);
    const kl = this.data.keyInBits.slice(0, 128);
    const kr = this.data.keyInBits.slice(128, 256);
    const kll = kl.slice(0, 64);
    const klr = kl.slice(64, 128);
    this.kwkeys.push(kll);
    this.kwkeys.push(klr);
    const kakb = this.keyVariables(kl, kr);
    const Ka = kakb.ka;
    const Kb = kakb.kb;
    //1
    this.subkeys.push(Kb.slice(0, 64));
    //2
    this.subkeys.push(Kb.slice(64, 128));
    //3
    this.subkeys.push(Utils.rotLeft(kr, 15).slice(0, 64));
    //4
    this.subkeys.push(Utils.rotLeft(kr, 15).slice(64, 128));
    //5
    this.subkeys.push(Utils.rotLeft(Ka, 15).slice(0, 64));
    //6
    this.subkeys.push(Utils.rotLeft(Ka, 15).slice(64, 128));

    this.klkeys.push(Utils.rotLeft(kr, 30).slice(0, 64));
    this.klkeys.push(Utils.rotLeft(kr, 30).slice(64, 128));

    //7
    this.subkeys.push(Utils.rotLeft(Kb, 30).slice(0, 64));
    //8
    this.subkeys.push(Utils.rotLeft(Kb, 30).slice(64, 128));
    //9
    this.subkeys.push(Utils.rotLeft(kl, 45).slice(0, 64));
    //10
    this.subkeys.push(Utils.rotLeft(kl, 45).slice(64, 128));
    //11
    this.subkeys.push(Utils.rotLeft(Ka, 45).slice(0, 64));
    //12
    this.subkeys.push(Utils.rotLeft(Ka, 45).slice(64, 128));

    this.klkeys.push(Utils.rotLeft(kl, 60).slice(0, 64));
    this.klkeys.push(Utils.rotLeft(kl, 60).slice(64, 128));

    //13
    this.subkeys.push(Utils.rotLeft(kr, 60).slice(0, 64));
    //14
    this.subkeys.push(Utils.rotLeft(kr, 60).slice(64, 128));
    //15
    this.subkeys.push(Utils.rotLeft(Kb, 60).slice(0, 64));
    //16
    this.subkeys.push(Utils.rotLeft(Kb, 60).slice(64, 128));
    //17
    this.subkeys.push(Utils.rotLeft(kl, 77).slice(0, 64));
    //18
    this.subkeys.push(Utils.rotLeft(kl, 77).slice(64, 128));

    this.klkeys.push(Utils.rotLeft(Ka, 77).slice(0, 64));
    this.klkeys.push(Utils.rotLeft(Ka, 77).slice(64, 128));

    //19
    this.subkeys.push(Utils.rotLeft(kr, 94).slice(0, 64));
    //20
    this.subkeys.push(Utils.rotLeft(kr, 94).slice(64, 128));
    //21
    this.subkeys.push(Utils.rotLeft(Ka, 94).slice(0, 64));
    //22
    this.subkeys.push(Utils.rotLeft(Ka, 94).slice(64, 128));
    //23
    this.subkeys.push(Utils.rotLeft(kl, 111).slice(0, 64));
    //24
    this.subkeys.push(Utils.rotLeft(kl, 111).slice(64, 128));

    this.kwkeys.push(Utils.rotLeft(Kb, 111).slice(0, 64));
    this.kwkeys.push(Utils.rotLeft(Kb, 111).slice(64, 128));
  }

  flFunction(bits64, subKey64) {
    subKey64 = subKey64.flat();
    const Yr = Utils.XOR(Utils.rotLeft(Utils.AND(bits64.slice(0, 32), subKey64.slice(0, 32)), 1), bits64.slice(32, 64));
    const Yl = Utils.XOR(Utils.OR(Yr, subKey64.slice(32, 64)), bits64.slice(0, 32));
    return [Yl, Yr].flat();
  }

  flReverseFunction(bits64, subKey64) {
    subKey64 = subKey64.flat();
    const YRl = Utils.XOR(Utils.OR(bits64.slice(32, 64), subKey64.slice(32, 64)), bits64.slice(0, 32));
    const YRr = Utils.XOR(Utils.rotLeft(Utils.AND(YRl, subKey64.slice(0, 32)), 1), bits64.slice(32, 64));
    return [YRl, YRr].flat();
  }

  sixRoundFunction(left, right, subkeys) {
    let newLeft,
      newRight = null;
    for (let i = 0; i < 6; i++) {
      newLeft = Utils.XOR(this.fFunction(left, subkeys[i]), right);
      newRight = left;
      left = newLeft;
      right = newRight;
      /*  console.log(`SixRound number ${i} - 
      left: ${left}
      right: ${right}`); */
    }
    return [left, right];
  }

  encrypt(plaintext) {
    let plaintextInBits = new Utils(plaintext, "");
    plaintextInBits = plaintextInBits.bits;
    const padLength = 128 - plaintextInBits.length;
    for (let i = 0; i < padLength; i++) {
      plaintextInBits.push(0);
    }
    let left = plaintextInBits.slice(0, 64);
    let right = plaintextInBits.slice(64, 128);

    left = Utils.XOR(left, this.kwkeys[0]);
    right = Utils.XOR(right, this.kwkeys[1]);

    for (let i = 0; i < 4; i++) {
      console.log(left, right);
      [left, right] = this.sixRoundFunction(left, right, this.subkeys.slice(i * 6, (i + 1) * 6));
      console.log(this.subkeys.slice(i * 6, (i + 1) * 6));
      if (i < 3) {
        left = this.flFunction(left, this.klkeys.slice(2 * i, 2 * i + 1).flat());
        right = this.flReverseFunction(right, this.klkeys.slice(2 * i + 1, 2 * i + 2).flat());
        // console.log(this.klkeys.slice(2 * i, 2 * i + 1).flat(), this.klkeys.slice(2 * i + 1, 2 * i + 2).flat());
      }
    }
    let newLeft,
      newRight = null;
    newLeft = Utils.XOR(this.kwkeys[2], right);
    newRight = Utils.XOR(this.kwkeys[3], left);

    let finalText = [newLeft, newRight].flat();
    // console.log(finalText);
    finalText = Utils.bin2hex(finalText);
    // finalText = Utils.hexToString(finalText);

    return finalText;
  }

  decrypt(ciphertext) {
    let cipherTextInBits = Utils.hex2bin(ciphertext);
    // const padLength = 128 - cipherTextInBits.length;
    // for (let i = 0; i < padLength; i++) {
    //   cipherTextInBits.push(0);
    // }
    // console.log(cipherTextInBits);
    let left = cipherTextInBits.slice(0, 64);
    let right = cipherTextInBits.slice(64, 128);

    left = Utils.XOR(left, this.kwkeys[2]);
    right = Utils.XOR(right, this.kwkeys[3]);

    for (let i = 3; i >= 0; i--) {
      [left, right] = this.sixRoundFunction(left, right, this.subkeys.slice(i * 6, (i + 1) * 6).reverse());
      if (i > 0) {
        left = this.flFunction(left, this.klkeys.slice(2 * i - 1, 2 * i).flat());
        right = this.flReverseFunction(right, this.klkeys.slice(2 * i - 2, 2 * i - 1).flat());
      }
    }
    let newLeft,
      newRight = null;
    newLeft = Utils.XOR(this.kwkeys[0], right);
    newRight = Utils.XOR(this.kwkeys[1], left);

    let finalText = [newLeft, newRight].flat();
    finalText = Utils.bin2hex(finalText);
    finalText = Utils.hexToString(finalText);
    return finalText;
  }

  keyVariables(kl, kr) {
    let Ka = [];
    let Kb = [];
    let klCopy = [...kl];
    let krCopy = [...kr];
    // console.log(`Key variables: ${kl.length}, ${kr.length}`);
    const xored = Utils.XOR(klCopy, krCopy);
    // console.log(`Key variables xored: ${xored.length}`);
    let left = xored.slice(0, 64);
    let right = xored.slice(64, 128);
    let newRight,
      newLeft = null;
    for (let i = 0; i < 2; i++) {
      newLeft = Utils.XOR(this.fFunction(left, this["sigma" + (i + 1).toString()]), right);
      newRight = left;
      left = newLeft;
      right = newRight;
    }
    let firstOperation = [[...newLeft], [...newRight]].flat();
    firstOperation = Utils.XOR(firstOperation, klCopy);
    left = firstOperation.slice(0, 64);
    right = firstOperation.slice(64, 128);
    for (let i = 0; i < 2; i++) {
      newLeft = Utils.XOR(this.fFunction(left, this["sigma" + (i + 3).toString()]), right);
      newRight = left;
      left = newLeft;
      right = newRight;
    }

    Ka = [[...newLeft], [...newRight]].flat();

    Kb = Utils.XOR([...Ka], krCopy);
    left = Kb.slice(0, 64);
    right = Kb.slice(64, 128);
    left = firstOperation.slice(0, 64);
    right = firstOperation.slice(64, 128);
    for (let i = 0; i < 2; i++) {
      newLeft = Utils.XOR(this.fFunction(left, this["sigma" + (i + 5).toString()]), right);
      newRight = left;
      left = newLeft;
      right = newRight;
    }
    Kb = [[...newLeft], [...newRight]].flat();

    return {
      ka: Ka,
      kb: Kb,
    };
  }

  fFunction(bits64, subKey64) {
    let bits64Copy = [...bits64];
    let subKey64Copy = [...subKey64];
    // console.log(`fFunction: ${bits64Copy} and ${subKey64Copy}`);
    const S = this.sFunction(Utils.XOR(bits64Copy, subKey64Copy));
    const Y = this.pFunction(S);
    return Y;
  }

  pFunction(bits64) {
    const yTab = [];
    const bits64Copy = [...bits64];
    /*     const bytes = [];
    for (let i = 0; i < 8; i++) {
      bytes.push(bits64Copy.slice(i * 8, (i + 1) * 8));
    } */
    // console.log("P function: ", bits64Copy);
    //y1 = x0 XOR x2 XOR x3 XOR x5 XOR x6 XOR x7
    yTab[0] = Utils.XOR(bits64Copy[0], bits64Copy[2], bits64Copy[3], bits64Copy[5], bits64Copy[6], bits64Copy[7]);
    //y2 = x0 XOR x1 XOR x3 XOR x4 XOR x6 XOR x7
    yTab[1] = Utils.XOR(bits64Copy[0], bits64Copy[1], bits64Copy[3], bits64Copy[4], bits64Copy[6], bits64Copy[7]);
    //y3 = x0 XOR x1 XOR x2 XOR x4 XOR x5 XOR x7
    yTab[2] = Utils.XOR(bits64Copy[0], bits64Copy[1], bits64Copy[2], bits64Copy[4], bits64Copy[5], bits64Copy[7]);
    //y4 = x1 XOR x2 XOR x3 XOR x4 XOR x5 XOR x6
    yTab[3] = Utils.XOR(bits64Copy[1], bits64Copy[2], bits64Copy[3], bits64Copy[4], bits64Copy[5], bits64Copy[6]);
    //y5 = x0 XOR x1 XOR x5 XOR x6 XOR x7
    yTab[4] = Utils.XOR(bits64Copy[0], bits64Copy[1], bits64Copy[5], bits64Copy[6], bits64Copy[7]);
    //y6 = x1 XOR x2 XOR x4 XOR x6 XOR x7
    yTab[5] = Utils.XOR(bits64Copy[1], bits64Copy[2], bits64Copy[4], bits64Copy[6], bits64Copy[7]);
    //y7 = x2 XOR x3 XOR x4 XOR x5 XOR x7
    yTab[6] = Utils.XOR(bits64Copy[2], bits64Copy[3], bits64Copy[4], bits64Copy[5], bits64Copy[7]);
    //y64 = x0 XOR x3 XOR x4 XOR x5 XOR x6
    yTab[7] = Utils.XOR(bits64Copy[0], bits64Copy[3], bits64Copy[4], bits64Copy[5], bits64Copy[6]);
    // console.log("YTAB: ", yTab.flat());
    return yTab.flat();
  }

  sFunction(bits64) {
    const yTab = [];
    const bits8 = [];
    for (let i = 0; i < 8; i++) {
      bits8.push(bits64.slice(i * 8, (i + 1) * 8));
    }
    // console.log("S Function: ", bits64, bits8);
    const sBox = [112, 130, 44, 236, 179, 39, 192, 229, 228, 133, 87, 53, 234, 12, 174, 65, 35, 239, 107, 147, 69, 25, 165, 33, 237, 14, 79, 78, 29, 101, 146, 189, 134, 184, 175, 143, 124, 235, 31, 206, 62, 48, 220, 95, 94, 197, 11, 26, 166, 225, 57, 202, 213, 71, 93, 61, 217, 1, 90, 214, 81, 86, 108, 77, 139, 13, 154, 102, 251, 204, 176, 45, 116, 18, 43, 32, 240, 177, 132, 153, 223, 76, 203, 194, 52, 126, 118, 5, 109, 183, 169, 49, 209, 23, 4, 215, 20, 88, 58, 97, 222, 27, 17, 28, 50, 15, 156, 22, 83, 24, 242, 34, 254, 68, 207, 178, 195, 181, 122, 145, 36, 8, 232, 168, 96, 252, 105, 80, 170, 208, 160, 125, 161, 137, 98, 151, 84, 91, 30, 149, 224, 255, 100, 210, 16, 196, 0, 72, 163, 247, 117, 219, 138, 3, 230, 218, 9, 63, 221, 148, 135, 92, 131, 2, 205, 74, 144, 51, 115, 103, 246, 243, 157, 127, 191, 226, 82, 155, 216, 38, 200, 55, 198, 59, 129, 150, 111, 75, 19, 190, 99, 46, 233, 121, 167, 140, 159, 110, 188, 142, 41, 245, 249, 182, 47, 253, 180, 89, 120, 152, 6, 106, 231, 70, 113, 186, 212, 37, 171, 66, 136, 162, 141, 250, 114, 7, 185, 85, 248, 238, 172, 10, 54, 73, 42, 104, 60, 56, 241, 164, 64, 40, 211, 123, 187, 201, 67, 193, 21, 227, 173, 244, 119, 199, 128, 158];

    yTab[0] = Utils.numberToBits(sBox[Utils.bitsToNumber(bits8[0])], 8);
    yTab[1] = Utils.rotLeft(Utils.numberToBits(sBox[Utils.bitsToNumber(bits8[1])], 8), 1);
    yTab[2] = Utils.rotRight(Utils.numberToBits(sBox[Utils.bitsToNumber(bits8[2])], 8), 1);
    yTab[3] = Utils.numberToBits(sBox[Utils.bitsToNumber(Utils.rotLeft(bits8[3], 1))], 8);
    yTab[4] = Utils.rotLeft(Utils.numberToBits(sBox[Utils.bitsToNumber(bits8[4])], 8), 1);
    yTab[5] = Utils.rotRight(Utils.numberToBits(sBox[Utils.bitsToNumber(bits8[5])], 8), 1);
    yTab[6] = Utils.numberToBits(sBox[Utils.bitsToNumber(Utils.rotLeft(bits8[6], 1))], 8);
    yTab[7] = Utils.numberToBits(sBox[Utils.bitsToNumber(bits8[7])], 8);

    return yTab;
  }
}

export default Camellia;

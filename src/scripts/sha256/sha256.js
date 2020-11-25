import Utils from "./sha256utils.js";

const sha256 = (text) => {
  let k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

  //Initial values for compression function
  let i = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  let changeInit = false;
  let messageArr = [];
  let finalValues = [];
  let hash = "";

  let kInBits = [];
  let iInBits = [];

  let messageBlock = new Utils(text);
  messageBlock.addShaPadding(Math.ceil((text.length * 8 + 65) / 512));
  for (let i = 0; i < Math.ceil((text.length * 8 + 65) / 512); i++) {
    messageArr.push(messageBlock.bits.slice(i * 512, (i + 1) * 512));
  }

  for (let initVal of i) {
    iInBits.push(Utils.hex2bin(initVal));
  }

  for (let constant of k) {
    kInBits.push(Utils.hex2bin(constant));
  }

  for (let message of messageArr) {
    let messageSchedule = [];
    for (let i = 0; i < 16; i++) {
      messageSchedule.push(message.slice(i * 32, (i + 1) * 32));
    }

    for (let i = 16; i < 64; i++) {
      messageSchedule.push(Utils.addition(32, Utils.sigma1(messageSchedule[i - 2]), messageSchedule[i - 7], Utils.sigma0(messageSchedule[i - 15]), messageSchedule[i - 16]));
    }

    if (!changeInit) {
      for (let val of iInBits) {
        finalValues.push([...val]);
      }
    } else {
      iInBits = [];
      for (let val of finalValues) {
        iInBits.push([...val]);
      }
    }

    for (let i = 0; i < messageSchedule.length; i++) {
      let t1 = Utils.addition(32, Utils.bigSigma1(finalValues[4]), Utils.choice(finalValues[4], finalValues[5], finalValues[6]), finalValues[7], kInBits[i], messageSchedule[i]);
      let t2 = Utils.addition(32, Utils.bigSigma0(finalValues[0]), Utils.majority(finalValues[0], finalValues[1], finalValues[2]));

      finalValues.pop();
      finalValues.unshift(Utils.addition(32, t1, t2));
      finalValues[4] = Utils.addition(32, finalValues[4], t1);
    }

    hash = "";
    for (let i = 0; i < 8; i++) {
      finalValues[i] = Utils.addition(32, finalValues[i], iInBits[i]);
      hash += Utils.bin2hex(finalValues[i]);
    }
    changeInit = true;
  }
  return hash;
};

export default sha256;

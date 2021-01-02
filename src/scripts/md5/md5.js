import Utils from "./md5utils";

const MD5 = (text) => {
  const F = (X, Y, Z) => (X & Y) | (~X & Z);
  const G = (X, Y, Z) => (X & Z) | (Y & ~Z);
  const H = (X, Y, Z) => X ^ Y ^ Z;
  const I = (X, Y, Z) => Y ^ (X | ~Z);

  const FF = (a, b, c, d, k, s, i) => {
    a = Utils.addition(a, Utils.addition(Utils.addition(F(b, c, d), X[k]), T[i]));
    return Utils.addition(Utils.rotLeft(a, s), b);
  };

  const GG = (a, b, c, d, k, s, i) => {
    a = Utils.addition(a, Utils.addition(Utils.addition(G(b, c, d), X[k]), T[i]));
    return Utils.addition(Utils.rotLeft(a, s), b);
  };

  const HH = (a, b, c, d, k, s, i) => {
    a = Utils.addition(a, Utils.addition(Utils.addition(H(b, c, d), X[k]), T[i]));
    return Utils.addition(Utils.rotLeft(a, s), b);
  };

  const II = (a, b, c, d, k, s, i) => {
    a = Utils.addition(a, Utils.addition(Utils.addition(I(b, c, d), X[k]), T[i]));
    return Utils.addition(Utils.rotLeft(a, s), b);
  };

  let T = [0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x2441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x4881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391];
  let A = 0x67452301;
  let B = 0xefcdab89;
  let C = 0x98badcfe;
  let D = 0x10325476;

  let messageBlock = new Utils(text);
  let X = messageBlock.words;
  console.log(X);
  for (let i = 0; i < X.length; i += 16) {
    let AA = A;
    let BB = B;
    let CC = C;
    let DD = D;

    //Round 1

    AA = FF(AA, BB, CC, DD, 0 + i, 7, 0);
    DD = FF(DD, AA, BB, CC, 1 + i, 12, 1);
    CC = FF(CC, DD, AA, BB, 2 + i, 17, 2);
    BB = FF(BB, CC, DD, AA, 3 + i, 22, 3);
    AA = FF(AA, BB, CC, DD, 4 + i, 7, 4);
    DD = FF(DD, AA, BB, CC, 5 + i, 12, 5);
    CC = FF(CC, DD, AA, BB, 6 + i, 17, 6);
    BB = FF(BB, CC, DD, AA, 7 + i, 22, 7);
    AA = FF(AA, BB, CC, DD, 8 + i, 7, 8);
    DD = FF(DD, AA, BB, CC, 9 + i, 12, 9);
    CC = FF(CC, DD, AA, BB, 10 + i, 17, 10);
    BB = FF(BB, CC, DD, AA, 11 + i, 22, 11);
    AA = FF(AA, BB, CC, DD, 12 + i, 7, 12);
    DD = FF(DD, AA, BB, CC, 13 + i, 12, 13);
    CC = FF(CC, DD, AA, BB, 14 + i, 17, 14);
    BB = FF(BB, CC, DD, AA, 15 + i, 22, 15);

    //Round 2

    AA = GG(AA, BB, CC, DD, 1 + i, 5, 16);
    DD = GG(DD, AA, BB, CC, 6 + i, 9, 17);
    CC = GG(CC, DD, AA, BB, 11 + i, 14, 18);
    BB = GG(BB, CC, DD, AA, 0 + i, 20, 19);
    AA = GG(AA, BB, CC, DD, 5 + i, 5, 20);
    DD = GG(DD, AA, BB, CC, 10 + i, 9, 21);
    CC = GG(CC, DD, AA, BB, 15 + i, 14, 22);
    BB = GG(BB, CC, DD, AA, 4 + i, 20, 23);
    AA = GG(AA, BB, CC, DD, 9 + i, 5, 24);
    DD = GG(DD, AA, BB, CC, 14 + i, 9, 25);
    CC = GG(CC, DD, AA, BB, 3 + i, 14, 26);
    BB = GG(BB, CC, DD, AA, 8 + i, 20, 27);
    AA = GG(AA, BB, CC, DD, 13 + i, 5, 28);
    DD = GG(DD, AA, BB, CC, 2 + i, 9, 29);
    CC = GG(CC, DD, AA, BB, 7 + i, 14, 30);
    BB = GG(BB, CC, DD, AA, 12 + i, 20, 31);

    //Round 3

    AA = HH(AA, BB, CC, DD, 5 + i, 4, 32);
    DD = HH(DD, AA, BB, CC, 8 + i, 11, 33);
    CC = HH(CC, DD, AA, BB, 11 + i, 16, 34);
    BB = HH(BB, CC, DD, AA, 14 + i, 23, 35);
    AA = HH(AA, BB, CC, DD, 1 + i, 4, 36);
    DD = HH(DD, AA, BB, CC, 4 + i, 11, 37);
    CC = HH(CC, DD, AA, BB, 7 + i, 16, 38);
    BB = HH(BB, CC, DD, AA, 10 + i, 23, 39);
    AA = HH(AA, BB, CC, DD, 13 + i, 4, 40);
    DD = HH(DD, AA, BB, CC, 0 + i, 11, 41);
    CC = HH(CC, DD, AA, BB, 3 + i, 16, 42);
    BB = HH(BB, CC, DD, AA, 6 + i, 23, 43);
    AA = HH(AA, BB, CC, DD, 9 + i, 4, 44);
    DD = HH(DD, AA, BB, CC, 12 + i, 11, 45);
    CC = HH(CC, DD, AA, BB, 15 + i, 16, 46);
    BB = HH(BB, CC, DD, AA, 2 + i, 23, 47);

    //Round 4

    AA = II(AA, BB, CC, DD, 0 + i, 6, 48);
    DD = II(DD, AA, BB, CC, 7 + i, 10, 49);
    CC = II(CC, DD, AA, BB, 14 + i, 15, 50);
    BB = II(BB, CC, DD, AA, 5 + i, 21, 51);
    AA = II(AA, BB, CC, DD, 12 + i, 6, 52);
    DD = II(DD, AA, BB, CC, 3 + i, 10, 53);
    CC = II(CC, DD, AA, BB, 10 + i, 15, 54);
    BB = II(BB, CC, DD, AA, 1 + i, 21, 55);
    AA = II(AA, BB, CC, DD, 8 + i, 6, 56);
    DD = II(DD, AA, BB, CC, 15 + i, 10, 57);
    CC = II(CC, DD, AA, BB, 6 + i, 15, 58);
    BB = II(BB, CC, DD, AA, 13 + i, 21, 59);
    AA = II(AA, BB, CC, DD, 4 + i, 6, 60);
    DD = II(DD, AA, BB, CC, 11 + i, 10, 61);
    CC = II(CC, DD, AA, BB, 2 + i, 15, 62);
    BB = II(BB, CC, DD, AA, 9 + i, 21, 63);
    A = Utils.addition(A, AA);
    B = Utils.addition(B, BB);
    C = Utils.addition(C, CC);
    D = Utils.addition(D, DD);
  }
  return Utils.WordToHex(A) + Utils.WordToHex(B) + Utils.WordToHex(C) + Utils.WordToHex(D);
};

export default MD5;

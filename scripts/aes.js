/**
 * AES128
 * 
 * Documentation used: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf
 * Made use of (within MixColumns function): https://crypto.stackexchange.com/a/2403
 */
class AES{

    static sbox = [
        0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
        0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
        0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
        0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
        0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
        0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
        0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
        0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
        0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
        0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
        0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
        0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
        0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
        0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
        0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
        0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
    ];
    static invsbox = [
        0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
        0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
        0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
        0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
        0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
        0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
        0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
        0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
        0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
        0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
        0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
        0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
        0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
        0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
        0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
        0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d
    ];


    static KeyExpansion(key, Nk, Nr){
        function SubWord(input){
            return AES.SubBytes(input);
        }
        function RotWord(input){
            let output = copyArray(input);
            for(let i = 0; i < 4; ++i){
                let shiftedVal = input[(i + 1) % 4];
                output[i] = shiftedVal;
            }
            return output;
        }
        const Rcon = [
            [0x00, 0, 0, 0],
            [0x01, 0, 0, 0],
            [0x02, 0, 0, 0],
            [0x04, 0, 0, 0],
            [0x08, 0, 0, 0],
            [0x10, 0, 0, 0],
            [0x20, 0, 0, 0],
            [0x40, 0, 0, 0],
            [0x80, 0, 0, 0],
            [0x1b, 0, 0, 0], // = 0x80 << 1 ^ 0x11B
            [0x36, 0, 0, 0]
        ];

        let w = [];

        let i = 0;
        while(i < Nk){
            w[i] = [];
            w[i].push(key[4*i +0]);
            w[i].push(key[4*i +1]);
            w[i].push(key[4*i +2]);
            w[i].push(key[4*i +3]);

            i = i + 1;
        }

        i = Nk;

        while(i < 4 * (Nr+1)){
            let temp = w[i-1];
            if(i % Nk == 0){
                temp = XOR( SubWord(RotWord(temp)), Rcon[Math.floor(i/Nk)] );
            }else if(Nk > 6 && i % Nk == 4){
                temp = SubWord(temp);
            }
            w[i] = XOR(w[i-Nk], temp);
            
            i = i + 1;
        }

        
        let w2 = [];
        for(let i = 0; i < w.length; i += 4){
            let tmp = [];
            
            for(let zm2 = 0; zm2 < 4; ++zm2){
                for(let zm1 = 0; zm1 < 4; ++zm1){
                    tmp.push(w[i + zm1][zm2]);
                }
            }
            
            w2.push(tmp);
        }

        return w2;
    }
    static AddRoundKey(state, w, roundID){        
        return XOR(state, w[roundID]);
    }
    static SubBytes(state){
        for(let i = 0; i < state.length; ++i){
            let substitution = this.sbox[state[i]];
            state[i] = substitution;
        }
        return state;
    }
    static InvSubBytes(state){
        for(let i = 0; i < state.length; ++i){
            let substitution = this.invsbox[state[i]];
            state[i] = substitution;
        }
        return state;
    }
    static ShiftRows(state){
        let retState = copyArray(state);

        for(let r = 1; r < 4; ++r){
            for(let c = 0; c < 4; ++c){
                let shiftedVal = state[ rcTo1d(r, (c + r) % 4 ) ];
                retState[ rcTo1d(r, c) ] = shiftedVal;
            }
        }

        return retState;
    }
    static InvShiftRows(state){
        let retState = copyArray(state);

        for(let r = 1; r < 4; ++r){
            for(let c = 0; c < 4; ++c){
                let shiftedVal = state[ rcTo1d(r, c) ];
                retState[ rcTo1d(r, (c + r) % 4 ) ] = shiftedVal;
            }
        }

        return retState;
    }

    static MixColumns(state){
        let retState = copyArray(state);

        function mulX2(value){
            let ret = value << 1;
            if(value >> 7 & 1){
                ret ^= 0x1B;
            }
            return ret & 0xff;
        }
        function mulX3(value){
            return mulX2(value) ^ value;
        }

        for(let c = 0; c < 4; ++c){
            let newVal;

            let r_a = state[rcTo1d(0, c)];
            let r_b = state[rcTo1d(1, c)];
            let r_c = state[rcTo1d(2, c)];
            let r_d = state[rcTo1d(3, c)];
            
            newVal = mulX2(r_a) ^ mulX3(r_b) ^ r_c ^ r_d;
            retState[rcTo1d(0, c)] = newVal;
            
            newVal = r_a ^ mulX2(r_b) ^ mulX3(r_c) ^ r_d;
            retState[rcTo1d(1, c)] = newVal;
            
            newVal = r_a ^ r_b ^ mulX2(r_c) ^ mulX3(r_d);
            retState[rcTo1d(2, c)] = newVal;
            
            newVal = mulX3(r_a) ^ r_b ^ r_c ^ mulX2(r_d);
            retState[rcTo1d(3, c)] = newVal;            
        }

        return retState;
    }
    static InvMixColumns(state){
        let retState = copyArray(state);

        function mulX2(value){
            let ret = value << 1;
            if(value >> 7 & 1){
                ret ^= 0x1B;
            }
            return ret & 0xff;
        }
        function mulX4(value){
            return mulX2(mulX2(value));
        }
        function mulX8(value){
            return mulX4(mulX2(value));
        }
        function mulX9(value){
            return mulX8(value) ^ value;
        }
        function mulXb(value){//0x0b = 1011
            return mulX8(value) ^ mulX2(value) ^ value;
        }
        function mulXd(value){//0x0d = 1101
            return mulX8(value) ^ mulX4(value) ^ value;
        }
        function mulXe(value){//0x0e = 1110
            return mulX8(value) ^ mulX4(value) ^ mulX2(value);
        }

        for(let c = 0; c < 4; ++c){
            let newVal;

            let r_a = state[rcTo1d(0, c)];
            let r_b = state[rcTo1d(1, c)];
            let r_c = state[rcTo1d(2, c)];
            let r_d = state[rcTo1d(3, c)];
            
            newVal = mulXe(r_a) ^ mulXb(r_b) ^ mulXd(r_c) ^ mulX9(r_d);
            retState[rcTo1d(0, c)] = newVal;
            
            newVal = mulX9(r_a) ^ mulXe(r_b) ^ mulXb(r_c) ^ mulXd(r_d);
            retState[rcTo1d(1, c)] = newVal;
            
            newVal = mulXd(r_a) ^ mulX9(r_b) ^ mulXe(r_c) ^ mulXb(r_d);
            retState[rcTo1d(2, c)] = newVal;
            
            newVal = mulXb(r_a) ^ mulXd(r_b) ^ mulX9(r_c) ^ mulXe(r_d);
            retState[rcTo1d(3, c)] = newVal;            
        }

        return retState;
    }
    
    /**
     * expects input and key to be array of bytes, Nk and Nr ints
     */
    static Cipher(input, key, Nk, Nr){
        input = roteteArray(input);
        //key = roteteArray(key);
        
        let w = this.KeyExpansion(key, Nk, Nr);
                
        let state = input;

        state = this.AddRoundKey(state, w, 0);
        
        for(let round = 1; round <= Nr-1; ++round){
            state = this.SubBytes(state);
            state = this.ShiftRows(state);
            state = this.MixColumns(state);
            state = this.AddRoundKey(state, w, round);
        }

        state = this.SubBytes(state);
        state = this.ShiftRows(state);
        state = this.AddRoundKey(state, w, Nr);

        let output = roteteArray(state);
        return output;
    }
    /**
     * expects input and key to be array of bytes, Nk and Nr ints
     */
    static InvCipher(input, key, Nk, Nr){
        input = roteteArray(input);
        //key = roteteArray(key);
        
        let w = this.KeyExpansion(key, Nk, Nr);
                
        let state = input;

        state = this.AddRoundKey(state, w, Nr);
        
        for(let round = Nr-1; round >= 1; --round){
            state = this.InvShiftRows(state);
            state = this.InvSubBytes(state);
            state = this.AddRoundKey(state, w, round);
            state = this.InvMixColumns(state);
        }

        state = this.InvShiftRows(state);
        state = this.InvSubBytes(state);
        state = this.AddRoundKey(state, w, 0);

        let output = roteteArray(state);
        return output;
    }

    static determineNkNr(keyLenInBits){
        let Nk = 0;
        let Nr = 0;
        if(keyLenInBits <= 128){
            Nr = 10;
            Nk = 4;
        }else if(keyLenInBits <= 192){
            Nr = 12;
            Nk = 6;
        }else if(keyLenInBits <= 256){
            Nr = 14;
            Nk = 8;
        }else{
            //error or just 14?
            Nr = 14;
        }

        return [Nk, Nr];
    }

    /**
     * AES128 encryption
     * @param {string} pt_string 
     * @param {string} key_string 
     * @returns {byte[]} ciphertext in bytes
     */
    static encrypt(pt_string, key_string){
        let key = BitConverter.fromString(key_string);
        let pt = BitConverter.fromString(pt_string);

        key.addPadding(16);
        pt.addPadding(16);

        //determine number of rounds
        let [Nk, Nr] = this.determineNkNr(key.bits().length);

        let output = this.Cipher(pt.bytes(), key.bytes(), Nk, Nr);
        //let ct = BitConverter.fromBytes(output);
        let ct = output;       
        
        return ct;
    }
    /**
     * AES128 decryption
     * @param {byte[]} ct_bytes 
     * @param {string} key_string 
     * @returns {string} plaintext as string
     */
    static decrypt(ct_bytes, key_string){
        let key = BitConverter.fromString(key_string);
        let ct = BitConverter.fromBytes(ct_bytes);

        key.addPadding(16);

        //determine number of rounds
        let [Nk, Nr] = this.determineNkNr(key.bits().length);

        let output = this.InvCipher(ct.bytes(), key.bytes(), Nk, Nr);
        let pt = BitConverter.fromBytes(output);
        
        return pt.toString();
    }

}
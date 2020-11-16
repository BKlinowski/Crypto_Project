//https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf
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
        
        /*function Rcon(x){
            return AnyDimArray.from1d([Math.pow(2, x-1) % 229, 0, 0, 0]); //229 = 0xE5
        }*/
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
            [0x1b, 0, 0, 0],
            [0x36, 0, 0, 0]
        ];

        /*
            key -> [4*Nk]
            w   -> [Nb * (Nr+1)] (return)
        */

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

        return w;
    }
    static AddRoundKey(state, w, roundID){
        /*
            state -> [4][Nb]
        */

        
        return XOR(state, w[roundID]);
        

        let retState = AnyDimArray.copy(state);
        for(let c = 0; c < 4; ++c){
            let val;

            val = (state.get2d(0, c) ^ w[roundID*4 + c].get1d(0)) & 0xff;
            /*if(state.get2d(0, c) > 0xff || w[roundID*4 + c].get1d(0) > 0xff){
                console.log('aaa', state.get2d(0, c), w[roundID*4 + c].get1d(0));
                debugger;
            }*/
            retState.set2d(val, 0, c);
            
            val = (state.get2d(1, c) ^ w[roundID*4 + c].get1d(1)) & 0xff;
            /*if(state.get2d(1, c) > 0xff || w[roundID*4 + c].get1d(1) > 0xff){
                console.log('aaa', state.get2d(0, c), w[roundID*4 + c].get1d(0));
                debugger;
            }*/
            retState.set2d(val, 1, c);

            val = (state.get2d(2, c) ^ w[roundID*4 + c].get1d(2)) & 0xff;
            /*if(state.get2d(2, c) > 0xff || w[roundID*4 + c].get1d(2) > 0xff){
                console.log('aaa', state.get2d(0, c), w[roundID*4 + c].get1d(0));
                debugger;
            }*/
            retState.set2d(val, 2, c);

            val = (state.get2d(3, c) ^ w[roundID*4 + c].get1d(3)) & 0xff;
            /*if(state.get2d(3, c) > 0xff || w[roundID*4 + c].get1d(3) > 0xff){
                console.log('aaa', state.get2d(0, c), w[roundID*4 + c].get1d(0));
                debugger;
            }*/
            retState.set2d(val, 3, c);
        }

        return retState;
    }
    static SubBytes(state){
        for(let i = 0; i < state.length; ++i){
            let tmpArr = splitArrayIntoBlocks(
                BitConverter.fromBytes(state[i]).toBits(),
                4
            );
            tmpArr = [
                BitConverter.fromBits(tmpArr[0]).toBytes()[0],
                BitConverter.fromBits(tmpArr[1]).toBytes()[0]
            ];
            let substitution = this.sbox[ rcTo1d(tmpArr[0], tmpArr[1], 16) ];
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

    // https://crypto.stackexchange.com/questions/2402/how-to-solve-mixcolumns
    static MixColumns(state){
        let retState = copyArray(state);

        for(let c = 0; c < 4; ++c){
            let newVal;
            /*console.log(
                'c=' + c, 'r=0', 
                state.get2d(0, c), state.get2d(1, c), state.get2d(2, c), state.get2d(3, c)
            );*/

            let r_a = state[rcTo1d(0, c)];
            let r_b = state[rcTo1d(1, c)];
            let r_c = state[rcTo1d(2, c)];
            let r_d = state[rcTo1d(3, c)];

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
            //r = 0
            newVal = mulX2(r_a) ^ mulX3(r_b) ^ r_c ^ r_d;
            retState[rcTo1d(0, c)] = newVal;
            
            newVal = r_a ^ mulX2(r_b) ^ mulX3(r_c) ^ r_d;
            retState[rcTo1d(1, c)] = newVal;
            
            newVal = r_a ^ r_b ^ mulX2(r_c) ^ mulX3(r_d);
            retState[rcTo1d(2, c)] = newVal;
            
            newVal = mulX3(r_a) ^ r_b ^ r_c ^ mulX2(r_d);
            retState[rcTo1d(3, c)] = newVal;
            continue;

            //r = 0
            newVal = 
                ( state[rcTo1d(0, c)] << 1 ^ 0x1B ) ^
                ( 0x03 * state[rcTo1d(1, c)]  % 0xAC ) ^
                state[rcTo1d(2, c)] ^
                state[rcTo1d(3, c)]
            ;
            //newVal &= 0xff;
            retState[ rcTo1d(0, c) ] = newVal;
            //r = 1
            newVal = 
                state[rcTo1d(0, c)] ^
                ( state[rcTo1d(1, c)] << 1 ^ 0x1B ) ^
                ( state[rcTo1d(2, c)] << 1 ^ 0x1B ^ state[rcTo1d(2, c)] ) ^
                state[rcTo1d(3, c)]
            ;
            //newVal &= 0xff;
            retState[ rcTo1d(1, c) ] = newVal;
            //r = 2
            newVal = 
                state[rcTo1d(0, c)] ^
                state[rcTo1d(1, c)] ^
                ( state[rcTo1d(2, c)] << 1 ^ 0x1B ) ^
                ( 0x03 * state[rcTo1d(3, c)] )
            ;
            //newVal &= 0xff;
            retState[ rcTo1d(2, c) ] = newVal;
            //r = 3
            newVal = 
                ( 0x03 * state[rcTo1d(0, c)] ) ^
                state[rcTo1d(1, c)] ^
                state[rcTo1d(2, c)] ^
                ( state[rcTo1d(3, c)] << 1 ^ 0x1B )
            ;
            //newVal &= 0xff;
            retState[ rcTo1d(3, c) ] = newVal;
            
        }

        return retState;
    }
    
    /**
     * expects input and key to be array of bytes, Nk and Nr ints
     */
    static Cipher(input, key, Nk, Nr){
        input = roteteArray(input);
        //key = roteteArray(key);
        /*
            input -> [4*Nb]
            output -> [4*Nb] (return)
            w -> [Nb*(Nr+1)]
        */

        let wOld = this.KeyExpansion(key, Nk, Nr);
        /*console.log('moje w:', w);
        let tmpArrxd = [];
        for(let i = 0; i < w.length; i += 1){
            let tmp = 0;
            for(let j = 0; j < w[i].length; ++j){
                tmp = tmp << 8 | w[i].get1d(j);
            }
            
            if(i % 4 === 0){
                tmpArrxd.push([]);
            }
            tmpArrxd[Math.floor(i/4)].push(tmp);
        }
        console.log(tmpArrxd);*/
        //===
        //let w = wOld;
        let w = [];
        for(let i = 0; i < wOld.length; i += 4){
            let tmp = [];
            
            for(let zm2 = 0; zm2 < 4; ++zm2){
                for(let zm1 = 0; zm1 < 4; ++zm1){
                    tmp.push(wOld[i + zm1][zm2]);
                }
            }
            
            w.push(tmp);
        }
        //console.log('moje w:', w);
        
        let state = input;
        /*console.log('Before rot', 0);
        print1dArrayAs2d(state);
        //rotate state
        for(let j = 1; j <= 3; ++j){
            for(let i = 0; i < j; ++i){
                let tmpA = state[ rcTo1d(i, j) ];
                let tmpB = state[ rcTo1d(j, i) ];
                state[ rcTo1d(j, i) ] = tmpA;
                state[ rcTo1d(i, j) ] = tmpB;
            }
        }*/
        //console.log('Before round', 0);
        //print1dArrayAs2d(state);

        //debugger;
        state = this.AddRoundKey(state, w, 0);
        //console.log('After round', 0);
        //print1dArrayAs2d(state);

        for(let round = 1; round <= Nr-1; ++round){
            state = this.SubBytes(state);
            state = this.ShiftRows(state);
            state = this.MixColumns(state);
            state = this.AddRoundKey(state, w, round);
            
            //console.log('After round', round);
            //print1dArrayAs2d(state);
        }

        state = this.SubBytes(state);
        state = this.ShiftRows(state);
        state = this.AddRoundKey(state, w, Nr);
        //console.log('After round', Nr);
        //print1dArrayAs2d(state);

        let output = roteteArray(state);
        return output;
    }

    static encrypt(pt_string, key_string){
        /*
        console.log('====TEST=====');
        this.sbox.print2d(16);
        //console.log( this.sbox.get2d( 5, 3 ).toString(16) );
        //let data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
        let data = BitConverter.fromString("ABCDEFGHIJKLMNOP");
        let tmpState = AnyDimArray.from1d(data.bytes(), 4);
        
        console.log(data.bytes());
        tmpState.print2d();
        tmpState = this.ShiftRows(tmpState, 4);
        tmpState.print2d();
        return;
        console.log('=============');
        */
        
        let key = BitConverter.fromString(key_string);
        let pt = BitConverter.fromString(pt_string);

        //determine number of rounds
        let Nk = 0;
        let Nr = 0;
        let keyLenInBits = key.bits().length;
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

        let output = this.Cipher(pt.bytes(), key.bytes(), Nk, Nr);
        //let ct = BitConverter.fromBytes(output);
        let ct = output;

        /*console.log('===AES===');
        console.log('pt:');
        print1dArrayAs2d(pt.bytes());        
        console.log('key:');
        print1dArrayAs2d(key.bytes());
        console.log('ct:');
        print1dArrayAs2d(ct.bytes());*/
        
        
        return ct;
    }

}
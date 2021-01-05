import {BitConverter, copyArray} from "./bitUtils";

function XOR(a, b, retType = 'string'){
    let ret = [];
    if (typeof a === 'string' || a instanceof String){
        a = BitConverter.fromString(a).toBytes();
    }
    if (typeof b === 'string' || b instanceof String){
        b = BitConverter.fromString(b).toBytes();
    }

    let lenMax = Math.max(a.length, b.length);
    for(let i = 0; i < lenMax; ++i){
        let ai = a[i] || 0;
        let bi = b[i] || 0;
        ret.push( ai ^ bi );
    }

    if(retType == "string"){
        return BitConverter.fromBytes(ret).toString();
    }
    return ret;
}

class ECB {
    static encrypt(messageBlocks, encryptFunc){
        let ret = [];
        for(let mb of messageBlocks){
            let res = encryptFunc(mb);
            if(!Array.isArray(res)){
                res = [res];
            }
            ret = ret.concat(res).flat();
        }
        return ret;
    }
    static decrypt(messageBlocks, decryptFunc){
        let ret = "";
        for(let mb of messageBlocks){
            ret += decryptFunc(mb);
        }
        return ret;
    }
}
class CBC {
    static encrypt(messageBlocks, iv, encryptFunc){
        let ret = [];
        let prev = iv;
        for(let mb of messageBlocks){
            let res = encryptFunc( XOR(mb, prev, 'string') );
            prev = res;
            if(!Array.isArray(res)){
                res = [res];
            }
            ret = ret.concat(res).flat();
        }
        return ret;
    }
    static decrypt(messageBlocks, iv, decryptFunc){
        let ret = "";
        let prev = iv;
        for(let mb of messageBlocks){
            let origMb = copyArray(mb);
            let res = decryptFunc(mb);
            ret += XOR(res, prev, 'string');
            prev = origMb;
        }
        return ret;
    }
}
class CFB {
    static encrypt(messageBlocks, iv, encryptFunc){
        let ret = "";
        let prev = iv;
        for(let mb of messageBlocks){
            let res = encryptFunc(prev);
            res = XOR(res, mb);
            prev = res;

            ret += res;
        }
        return BitConverter.fromString(ret).toBytes();
    }
    static decrypt(messageBlocks, iv, encryptFunc){
        let ret = "";
        let prev = iv;
        for(let mb of messageBlocks){
            let res = encryptFunc(prev);
            prev = BitConverter.fromBytes(mb).toString();
            res = XOR(res, mb);
            ret += res;
        }
        return ret;
    }
}
class OFB {
    static encrypt(messageBlocks, iv, encryptFunc){
        let ret = "";
        let prev = iv;
        for(let mb of messageBlocks){
            let res = encryptFunc(prev);
            prev = BitConverter.fromBytes(res).toString();
            res = XOR(res, mb);

            ret += res;
        }
        return BitConverter.fromString(ret).toBytes();
    }
    static decrypt(messageBlocks, iv, encryptFunc){
        let ret = "";
        let prev = iv;
        for(let mb of messageBlocks){
            let res = encryptFunc(prev);
            prev = BitConverter.fromBytes(res).toString();
            res = XOR(res, mb);
            ret += res;
        }
        return ret;
    }
}
class CTR {
    static noncecounter(nonce, counter){
        let counter_str = "";
        for(let off = 0; off < 16; off += 2){
            counter_str = String.fromCharCode(counter >> off & 0xff) + counter_str;
        }
        return nonce + counter_str;
    }
    static encrypt(messageBlocks, nonce, encryptFunc){
        let ret = "";
        let counter = 0;
        for(let mb of messageBlocks){
            let res = encryptFunc(this.noncecounter(nonce, counter));
            res = XOR(res, mb);
            ret += res;
            ++counter;
        }
        return BitConverter.fromString(ret).toBytes();
    }
    static decrypt(messageBlocks, nonce, encryptFunc){
        let ret = "";
        let counter = 0;
        for(let mb of messageBlocks){
            let res = encryptFunc(this.noncecounter(nonce, counter));
            res = XOR(res, mb);
            ret += res;
            ++counter;
        }
        return ret;
    }
}

export default class ModeOfOperation {
    static PADDING_TYPE = {
        ADD_ZEROES: 0,
        DEFAULT: 0
    };
    static MODE = {
        ECB: 0,
        CBC: 1,
        CFB: 2,
        OFB: 3,
        CTR: 4,
        DEFAULT: 0
    };
    
    
    static messageIntoBlocks(message, blockSize = 16){
        let ret = [];
        for(let i = 0; i < message.length; i += blockSize){
            ret.push(
                message.slice(i, i + blockSize)
            );
        }
        return ret;
    }

    static addPadding(message, blockSize = 16, paddingType = this.PADDING_TYPE.DEFAULT){
        if(paddingType == this.PADDING_TYPE.ADD_ZEROES){
            while(message.length % blockSize != 0){
                message += '\u0000';
            }
            return message;
        }

        return message;
    }
    static removePadding(message, blockSize = 16, paddingType = this.PADDING_TYPE.DEFAULT){
        if(paddingType == this.PADDING_TYPE.ADD_ZEROES){
            message = message.replace(/(\u0000){1,}$/, "");
            return message;
        }

        return message;
    }
    
    static getParams(params){
        let paddingType = params.paddingType || this.PADDING_TYPE.DEFAULT;
        let modeOfOperation = params.modeOfOperation || this.MODE.DEFAULT;
        let blockSize = params.blockSize || 16;
        let iv = params.iv || '';
        let nonce = params.nonce || '';

        if(!Object.values(this.MODE).includes(modeOfOperation)){
            modeOfOperation = this.MODE.DEFAULT;
        }
        if(!Object.values(this.PADDING_TYPE).includes(paddingType)){
            paddingType = this.PADDING_TYPE.DEFAULT;
        }

        return [paddingType, modeOfOperation, blockSize, iv, nonce];
    }

    /**
     * Encrypts given string using given encryptFunc
     * 
     * Default params:
     * 
     * let params = {
     * paddingType: ModeOfOperation.PADDING_TYPE.DEFAULT,
     * modeOfOperation: ModeOfOperation.MODE.DEFAULT,
     * blockSize: 16,
     * iv: "",
     * nonce: ""
     * };
     * 
     * @param {string} message
     * @param {function (message)} encryptFunc
     * @param {function (ciphertext)} decryptFunc
     * @param {json} params
     */
    static encrypt( message, encryptFunc, decryptFunc, params = {} ){
        let paddingType, modeOfOperation, blockSize, iv, nonce;
        [paddingType, modeOfOperation, blockSize, iv, nonce] = this.getParams(params);

        message = this.addPadding(message, blockSize, params.paddingType);
        let messageBlocks = this.messageIntoBlocks(message, blockSize);

        if(modeOfOperation == this.MODE.ECB){
            return ECB.encrypt(messageBlocks, encryptFunc);
        }else if(modeOfOperation == this.MODE.CBC){
            return CBC.encrypt(messageBlocks, iv, encryptFunc);
        }else if(modeOfOperation == this.MODE.CFB){
            return CFB.encrypt(messageBlocks, iv, encryptFunc);
        }else if(modeOfOperation == this.MODE.OFB){
            return OFB.encrypt(messageBlocks, iv, encryptFunc);
        }else if(modeOfOperation == this.MODE.CTR){
            return CTR.encrypt(messageBlocks, nonce, encryptFunc);
        }else{
            return [];
        }
    }

    /**
     * Decrypts given bytes using given decryptFunc
     * 
     * Default params:
     * 
     * let params = {
     * paddingType: ModeOfOperation.PADDING_TYPE.DEFAULT,
     * modeOfOperation: ModeOfOperation.MODE.DEFAULT,
     * blockSize: 16,
     * iv: "",
     * nonce: ""
     * };
     * 
     * @param {byte[]} ciphertext
     * @param {function (message)} encryptFunc
     * @param {function (ciphertext)} decryptFunc
     * @param {json} params
     */
    static decrypt( ciphertext, encryptFunc, decryptFunc, params = {} ){
        let paddingType, modeOfOperation, blockSize, iv, nonce;
        [paddingType, modeOfOperation, blockSize, iv, nonce] = this.getParams(params);
        
        let ciphertextBlocks = this.messageIntoBlocks(ciphertext, blockSize);

        let plaintext = "";
        if(modeOfOperation == this.MODE.ECB){
            plaintext = ECB.decrypt(ciphertextBlocks, decryptFunc);
        }else if(modeOfOperation == this.MODE.CBC){
            plaintext = CBC.decrypt(ciphertextBlocks, iv, decryptFunc);
        }else if(modeOfOperation == this.MODE.CFB){
            plaintext = CFB.decrypt(ciphertextBlocks, iv, encryptFunc);
        }else if(modeOfOperation == this.MODE.OFB){
            plaintext = OFB.decrypt(ciphertextBlocks, iv, encryptFunc);
        }else if(modeOfOperation == this.MODE.CTR){
            plaintext = CTR.decrypt(ciphertextBlocks, nonce, encryptFunc);
        }

        plaintext = this.removePadding(plaintext, blockSize, paddingType);
        return plaintext;
    }

}

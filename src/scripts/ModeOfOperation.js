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

export default class ModeOfOperation {
    static PADDING_TYPE = {
        ADD_ZEROES: 0,
        DEFAULT: 0
    };
    static MODE = {
        ECB: 0,
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
        let paddingType = params.paddingType | this.PADDING_TYPE.DEFAULT;
        let modeOfOperation = params.modeOfOperation | this.MODE.DEFAULT;
        let blockSize = params.blockSize | 16;
        let iv = params.iv | '';
        let nonce = params.nonce | '';

        if(!Object.keys(this.MODE).includes(modeOfOperation)){
            modeOfOperation = this.MODE.DEFAULT;
        }
        if(!Object.keys(this.PADDING_TYPE).includes(paddingType)){
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
     * @param {json} params
     */
    static encrypt( message, encryptFunc, params = {} ){
        let paddingType, modeOfOperation, blockSize, iv, nonce;
        [paddingType, modeOfOperation, blockSize, iv, nonce] = this.getParams(params);
        
        message = this.addPadding(message, blockSize, params.paddingType | this.PADDING_TYPE.DEFAULT);
        let messageBlocks = this.messageIntoBlocks(message, blockSize);

        if(modeOfOperation == this.MODE.ECB){
            return ECB.encrypt(messageBlocks, encryptFunc);
        }

        return [];
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
     * @param {function (ciphertext)} decryptFunc
     * @param {json} params
     */
    static decrypt( ciphertext, decryptFunc, params = {} ){
        let paddingType, modeOfOperation, blockSize, iv, nonce;
        [paddingType, modeOfOperation, blockSize, iv, nonce] = this.getParams(params);
        
        let ciphertextBlocks = this.messageIntoBlocks(ciphertext, blockSize);

        let plaintext = "";
        if(modeOfOperation == this.MODE.ECB){
            plaintext = ECB.decrypt(ciphertextBlocks, decryptFunc);
        }

        plaintext = this.removePadding(plaintext, blockSize, paddingType);
        return plaintext;
    }

}

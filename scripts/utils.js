/**
 * Convert string/bytes/bits into string/bytes/bits
 * Ex. BitString.fromString('AAAABBBBCCCCDDDD').bytes() - converts string into bytes
 */
class BitString{

    bytesData = [];

    static fromString(str){
        let ret = new BitString();

        for (let i = 0; i < str.length; ++i) {
            let code = str.charCodeAt(i);
            ret.bytesData.push(code);
        }
        
        return ret;
    }
    static fromBytes(bytesArray){
        if(typeof(bytesArray) === 'number'){
            bytesArray = [bytesArray];
        }

        let ret = new BitString();
        ret.bytesData = bytesArray;
        return ret;
    }
    static fromBits(bitsArray){
        if(typeof(bitsArray) === 'number'){
            bitsArray = [bitsArray];
        }
        let bytesArray = [];

        //TODO: optimize
        let bits2add = (8 - (bitsArray.length % 8)) % 8;
        for(let i = 0; i < bits2add; ++i){
            bitsArray.splice(0, 0, 0);
        }

        for(let i = 0; i < bitsArray.length; i += 8){
            let b = 0;
            for(let j = 0; j < 8; ++j){
                b |= ( (bitsArray[i+j]&1) << 7-j);
            }
            bytesArray.push(b);
        }

        return this.fromBytes(bytesArray);
    }

    //==============================================

    string(){
        let ret = "";
        
        ret = "";
        for(let i = 0; i < bytesArray.length; ++i){
            let char = String.fromCharCode(bytesArray[i]);
            ret += (char);
        }
        
        return ret;
    }
    bytes(){
        return this.bytesData;
    }
    bits(){
        let ret = [];
        let bytes = this.bytes();

        for (let i = 0; i < bytes.length; ++i) {
            for(let j = 7; j >= 0; --j){
                ret.push( (bytes[i] & (1<<j)) >> j );
            }
        }
        
        return ret;
    }

}

//=======================================================================

/**
 * Allows the array to be accessed as 1 dimensional one or 2 dimensional one
 */
class AnyDimArray{
    arr1d = [];
    width = 0;

    static from1d(arr1d, widthFor2d = 0){
        let ret = new AnyDimArray();
        ret.arr1d = arr1d;
        ret.width = widthFor2d;
        if(ret.width == 0){
            ret.width = Math.sqrt(ret.length);
        }
        return ret;
    }
    static copy(anyDimArray){
        return AnyDimArray.from1d(anyDimArray.arr1d.slice(), anyDimArray.width);
    }
    
    /*static from2D(arr2d){
        let ret = new AnyDimArray();
        ret.arr1d = [];
        
        return ret;
    }*/

    get1d(x){
        return this.arr1d[x];
    }
    get2d(y, x, width=this.width){
        return this.arr1d[x + y*width];
    }
    set1d(value, x){
        this.arr1d[x] = value;
    }
    set2d(value, y, x, width=this.width){
        this.arr1d[x + y*width] = value;
    }

    get length(){
        return this.arr1d.length;
    }
    get width(){
        return this.width;
    }
    get height(){
        return Math.ceil(this.arr1d.length / this.width);
    }

    print1d(base=10){
        let str2print = "";
        for(let i = 0; i < this.length; ++i){
            str2print += " " + this.get1d(i).toString(base);
        }
        console.log(str2print);
    }
    print2d(base=10, width = this.width){
        let str2print = "";
        for(let j = 0; j < this.height; ++j){
            for(let i = 0; i < width; ++i){
                str2print += " " + this.get2d(j, i).toString(base);
            }
            str2print += "\n";
        }
        console.log(str2print);
    }

    //==========

    static xor(a, b){
        if(a.length != b.length){
            throw Error("Cannot XOR: a.length != b.length");
        }

        let ret = AnyDimArray.copy(a);
        for(let i = 0; i < ret.length; ++i){
            let tmp = a.get1d(i) ^ b.get1d(i);
            tmp &= 0xff;
            ret.set1d(tmp, i);
        }

        return ret;
    }
}

//=======================================================================

function splitArrayIntoBlocks(array, blockSize){
    let ret = [];

    for(let i = 0; i < array.length; i += blockSize){
        let blockID = i/blockSize;
        ret[blockID] = [];
        for(let j = 0; j < blockSize; ++j){
            ret[blockID][j] = array[i + j] || 0;
        }
    }

    return ret;
}


/*
function array1Dto2D(array, width){
    let ret = [];
    let height = Math.ceil(array.length / width);

    for(let i = 0; i < width; ++i){
        ret[i] = [];
        for(let j = 0; j < height; ++j){
            ret[i][j] = array[i + j*width] || 0;
        }
    }

    return ret;
}
*/
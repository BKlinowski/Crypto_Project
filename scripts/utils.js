/**
 * Convert string/bytes/bits into string/bytes/bits
 * Ex. BitConverter.fromString('AAAABBBBCCCCDDDD').toBytes() - converts string into bytes
 */
class BitConverter{

    bytesData = [];

    static fromString(str){
        let ret = new BitConverter();

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

        let ret = new BitConverter();
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
        for(let i = 0; i < this.bytesData.length; ++i){
            let char = String.fromCharCode(this.bytesData[i]);
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

    toString(){
        return this.string();
    }
    toHexString(){
        let ret = "";
        for(let i = 0; i < this.bytesData.length; ++i){
            let toAdd = this.bytesData[i].toString(16);
            if(toAdd.length < 2)
                toAdd = '0' + toAdd;
            ret += toAdd;
        }
        return ret;
    }
    toBytes(){
        return this.bytes();
    }
    toBits(){
        return this.bits();
    }

}

//=======================================================================

// /**
//  * Allows the array to be accessed as 1 dimensional one or 2 dimensional one
//  */
// class AnyDimArray{
//     arr1d = [];
//     width = 0;

//     static from1d(arr1d, widthFor2d = 0){
//         let ret = new AnyDimArray();
//         ret.arr1d = arr1d;
//         ret.width = widthFor2d;
//         if(ret.width == 0){
//             ret.width = Math.sqrt(ret.length);
//         }
//         return ret;
//     }
//     static copy(anyDimArray){
//         return AnyDimArray.from1d(anyDimArray.arr1d.slice(), anyDimArray.width);
//     }
    
//     /*static from2D(arr2d){
//         let ret = new AnyDimArray();
//         ret.arr1d = [];
        
//         return ret;
//     }*/

//     get1d(x){
//         return this.arr1d[x];
//     }
//     set1d(value, x){
//         this.arr1d[x] = value;
//     }

//     get2d(y, x, width=this.width){
//         return this.arr1d[x + y*width];
//     }
//     set2d(value, y, x, width=this.width){
//         this.arr1d[x + y*width] = value;
//     }
//     //=======
//     /*getXY(x, y, width=this.width){
//         return this.arr1d[x + y*width];
//     }
//     setXY(value, x, y, width=this.width){
//         this.arr1d[x + y*width] = value;
//     }
//     getRC(r, c, width=this.width){
//         return this.arr1d[x + y*width];
//     }
//     setRC(value, r, c, width=this.width){
//         this.arr1d[x + y*width] = value;
//     }*/

//     get length(){
//         return this.arr1d.length;
//     }
//     get width(){
//         return this.width;
//     }
//     get height(){
//         return Math.ceil(this.arr1d.length / this.width);
//     }

//     print1d(base=10){
//         let str2print = "";
//         for(let i = 0; i < this.length; ++i){
//             str2print += " " + this.get1d(i).toString(base);
//         }
//         console.log(str2print);
//     }
//     print2d(base=10, width = this.width){
//         let str2print = "";
//         for(let i = 0; i < width; ++i){
//             for(let j = 0; j < this.height; ++j){
//                 str2print += " " + this.get2d(j, i).toString(base);
//             }
//             str2print += "\n";
//         }
//         console.log(str2print);
//     }

//     //==========

//     static xor(a, b){
//         if(a.length != b.length){
//             throw Error("Cannot XOR: a.length != b.length");
//         }

//         let ret = AnyDimArray.copy(a);
//         for(let i = 0; i < ret.length; ++i){
//             let tmp = a.get1d(i) ^ b.get1d(i);
//             tmp &= 0xff;
//             ret.set1d(tmp, i);
//         }

//         return ret;
//     }
// }

//=======================================================================



/**
 * Returns a copy of the array. By value not by reference
 * @param {array} array 
 */
function copyArray(array){
    return array.slice();
}

/**
 * Splits the array into blocks of a given size
 * @param {array} array 
 * @param {int} blockSize 
 */
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

/**
 * XOR almost anything. Currently supports arrays (1d, 2d) and integers
 * @param {*} a 
 * @param {*} b 
 */
function XOR(a, b){
    if(typeof(a) === 'number' && typeof(b) === 'number'){
        //XOR numbers
        return a ^ b;

    }else if(Array.isArray(a) && Array.isArray(b)){
        let dimension = 1;
        
        let tmpA = a, tmpB = b;
        for(let i = 0; i < 10; ++i){
            if(
                typeof(tmpA[0]) !== 'undefined' && typeof(tmpB[0]) !== 'undefined'
                &&  Array.isArray(tmpA[0]) && Array.isArray(tmpB[0])
            ){
                dimension += 1;
                tmpA = tmpA[0];
                tmpB = tmpB[0];
            }
        }

        if(dimension === 1){
            //XOR 1d arrays
            if(a.length != b.length){
                throw Error("Cannot XOR: a.length != b.length");
            }
        
            let ret = copyArray(a);
            for(let i = 0; i < ret.length; ++i){
                let tmp = a[i] ^ b[i];
                tmp &= 0xff;
                ret[i] = tmp;
            }
        
            return ret;

        }else if(dimension === 2){
            //XOR 2d arrays
            throw Error('XORing 2d arrays is not yet supported!'); //TODO: do it for any dim array

        }else{
            throw Error('Currently XOR doesn\'t support ' + dimension + 'd arrays!');
        }
    }else{
        //XOR default
        console.log('WARNING:', 'XORing unsupported types!');
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
function rcTo1d(r, c, width = default2dWidth){
    return c + r * width;
}
/**
 * Converts x y coordinates into 1d array address
 * @param {int} x 
 * @param {int} y 
 * @param {int} width 
 */
function xyTo1d(x, y, width = default2dWidth){
    return x + y * width;
}


function roteteArray(array, width = default2dWidth){
    for(let j = 1; j < width; ++j){
        for(let i = 0; i < j; ++i){
            let tmpA = array[ rcTo1d(i, j) ];
            let tmpB = array[ rcTo1d(j, i) ];
            array[ rcTo1d(j, i) ] = tmpA;
            array[ rcTo1d(i, j) ] = tmpB;
        }
    }

    return array;
}

/**
 * prints 1d array
 * @param {array} array 
 * @param {int} base
 */
function print1dArray(array, base=16){
    let str2print = "";
    for(let i = 0; i < array.length; ++i){
        str2print += " " + array[i].toString(base);
    }
    console.log(str2print);
}
/**
 * prints 2d array
 * @param {array} array 
 * @param {int} base
 */
function print1dArrayAs2d(array, base=16, width=default2dWidth){
    let str2print = "";
    for(let i = 0; i < array.length; ++i){
        if(i != 0){
            if(i % width == 0)
                str2print += "\n";
            else
                str2print += " ";
        }
        str2print += array[i].toString(base);
    }
    console.log(str2print);
}
function print1dArrayAs2dOLD(arrayRot, base=16, width=default2dWidth){
    let array = copyArray(arrayRot);
    //rotate
    for(let j = 1; j <= 3; ++j){
        for(let i = 0; i < j; ++i){
            let tmpA = array[ rcTo1d(i, j) ];
            let tmpB = array[ rcTo1d(j, i) ];
            array[ rcTo1d(j, i) ] = tmpA;
            array[ rcTo1d(i, j) ] = tmpB;
        }
    }

    let str2print = "";
    for(let i = 0; i < array.length; ++i){
        if(i != 0){
            if(i % width == 0)
                str2print += "\n";
            else
                str2print += " ";
        }
        str2print += array[i].toString(base);
    }
    console.log(str2print);
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
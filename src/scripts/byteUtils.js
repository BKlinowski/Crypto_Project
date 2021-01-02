export default class Utils{

	static circularLeftShift32(n, amount){
		return ( (n << amount) | (n >> (32-amount)) ) & 0xffffffff;
	}
	static strToInt32Arr(str){
		while(str.length % 4 !== 0){
			str += '\u0000';
		}

		let ret = [];
		for(let i = 0; i < str.length; i += 4){
			ret.push(
					str.charCodeAt(i + 0) << 24
				| str.charCodeAt(i + 1) << 16
				| str.charCodeAt(i + 2) << 8
				| str.charCodeAt(i + 3) << 0
			);
		}

		return ret;
	}
	static int32ArrToStr(arr){
		let ret = "";
		
		for(let x of arr){
			ret += String.fromCharCode(x >> 24 & 0xff);
			ret += String.fromCharCode(x >> 16 & 0xff);
			ret += String.fromCharCode(x >>  8 & 0xff);
			ret += String.fromCharCode(x >>  0 & 0xff);
		}
		
		return ret;
	}
	static int32ArrToInt8Arr(arr){
		let ret = [];
		for(let x of arr){
			ret.push(x >> 24 & 0xff);
			ret.push(x >> 16 & 0xff);
			ret.push(x >>  8 & 0xff);
			ret.push(x >>  0 & 0xff);
		}
		return ret;
	}
	static int8ToInt32Arr(arr){
		let ret = [];
		for(let i = 0; i < arr.length; i += 4){
			ret.push(
					arr[i + 0] << 24
				| arr[i + 1] << 16
				| arr[i + 2] << 8
				| arr[i + 3] << 0
			);
		}
		return ret;
	}
	static addArrays(arrA, arrB){
		let ret = [];
		for(let i = 0; i < Math.min(arrA.length, arrB.length); ++i){
			ret.push(arrA[i] + arrB[i]);
		}
		return ret;
	}
	static xorArrays(arrA, arrB){
		let ret = [];
		for (let i = 0; i < Math.min(arrA.length, arrB.length); ++i) {
			ret.push(arrA[i] ^ arrB[i]);
		}
		return ret;
	}
	
}
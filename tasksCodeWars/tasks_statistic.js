// Statistics for an Athletic Association
function stat(strg) {
    if(!strg) return ''
    let str = strg.split(', ').map((x)=> x.split('|').map(Number))
    let arrResult = []
    for (let i = 0;i < str.length; i++){
      let el = str[i]
        arrResult.push(el[0]*3600 + el[1]*60 + el[2]);
      }
    arrResult = arrResult.sort((a,b)=>a-b);
    let result =(res)=>{
      let h = Math.floor(res / 3600);
      let m = Math.floor(res % 3600 / 60);
      let s = Math.floor(res % 60);
      if(h<10)h = '0'+ h
      if(m<10)m = '0'+ m
      if(s<10)s = '0'+ s
      return `${h}|${m}|${s}`
    }
    let aver =()=>{
      let res = arrResult.reduce((a,b)=>a+b)/arrResult.length
      return result(res)
    }
    let ran =()=>{
      let arr=[arrResult[0],arrResult[arrResult.length-1]] 
      let res = arr[1] - arr[0] 
      return result(res)
    }
    let median =()=>{
      if(arrResult.length % 2 === 0){
        let ind = arrResult.length/2
        let res = (arrResult[ind-1] + arrResult[ind])/2
        return result(res)
      } else {
        let ind = Math.floor(arrResult.length/2)
        let res = arrResult[ind];
        return result(res)
      }
    }
    
    return `Range: ${ran()} Average: ${aver()} Median: ${median()}`
}

// Distance from the average
function distancesFromAverage(arr){
    let mid = arr.reduce((a,b)=> a + b);
    mid = mid/arr.length
    return arr.map((x)=> Math.round((mid - x)*100)/100 )
}

// Find Nearest square number
function nearestSq(n){
    let result = Math.round(Math.sqrt(n))
    return result*result
}

// Difference of 2
function twosDifference(input){
    let arr = []
    for(let i = 0; i < input.length ; i++){
      for(let j = 0; j < input.length ; j++){
        if(input[i] +2 === input[j]){
            arr.push([input[i],input[j]].sort((a,b)=>a-b))
          }
      }
    }
    return arr 
  }

// Sort the odd
function sortArray(array) {
    let n = 0, arr=[];
    for( let el of array){
      if(el % 2 !== 0){
          arr.push(el)
      }
    }
    arr.sort((a,b)=> a - b)
    for(let i = 0; i < array.length; i++){
        if(array[i] % 2 !== 0){
            array[i] = arr[n]
            n++
        }
    }
    return array // =))
}

// Most frequently used words in a text
function topThreeWords(text) {
    let arrText = text.replaceAll('/',' ').split(/\s+/i),
        stat ={}, result = [];
    for(let el of arrText){
      if(/^[a-zA-Z]/.test(el)){
        el = el.toLowerCase()
          if(stat[el]){
            stat[el] = stat[el] + 1
          } else { stat[el] = 1 }
        }
    }
    stat = Object.entries(stat).sort(([a,],[b,])=>a.localeCompare(b))
      stat = stat.sort(([,a],[,b])=>b-a)
    for (let i = 0; i < 3 && i < stat.length; i++) {
       let key = stat[i][0]
        result.push(key)
    }
    return result;
}

// Pick peaks
function pickPeaks(arr){
    let result = {
      pos:[],
      peaks:[]
    }
    let trig = true; // чтоб не двоело (so as not to double up) =) 
    let obj = {// временный/промежуточный объект (temporary object)
      num:0,
      index:0
    }
    for(let i = 0; i < arr.length; i++){
      let b = arr[i],c = arr[i+1]
      if(c > b){ 
        obj.num = c;
        obj.index = i+1;
        trig = false
      } else if(b > c && !trig){
        result.pos.push(obj.index)
        result.peaks.push(obj.num)
        trig = true
      }
    }
    return result
}

// Range Extraction
function solution(list){ 
    let result = '';
    for(let i = 0; i < list.length; i++){
      let a = list[i];
      if(list[i-1] - a === -1 && list[i+1]-a === 1){
          result = result.slice(0,-1)
              result+='-'
        } else {
          result += a;
          if(list[i+1]||list[i+1]===0){result+=','}
        }
    }
    return result
}

// Sum of two lowest positive integers
function sumTwoSmallestNumbers(numbers) {
    let num = numbers.sort((a,b)=> a - b) // сортируем массив (sorting the array)
                .splice(0,2) // удаляем ненужные элементы (removing unnecessary elements)
                .reduce((a,b)=> a + b) // сумируем элементы массива (summing up the array elements)
    return num;
}
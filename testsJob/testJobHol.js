// расчет максимального минимально возможных ваиантов шага при двух подходах
function maxlimit(leng) {
    let result = leng, check = 0;
    
    for (let index = 0; index < leng; index++) {
        let sum = leng/index+index
        if(sum < result){
            result = sum;
            check = index
        }
    }
    return (result + '  ' + check)
}

// склонение слова "компьютер", в зависимости от количества
function declensWord(num){
    let str = 'компьютер';
    let numberEnd = num%10;
    if([2,3,4].includes(numberEnd)){
        str+='а'
    } else if ([5,6,7,8,9,0].includes(numberEnd)){
        str+='ов'
    } 
    return num+' '+str
}

// таблица умножения в консоль
function multiTable(num) {
    let table = '';
    for (let i = 0; i <= num; i++) {
        let str = ''+i;
        for (let j = 0; j <= num; j++) {
            let result = i * j || j;
            if(result < 10){ str += ' ' }
            str += ' ' + result;
        }
        table += str + '\n'
    }
 console.log(table)
}

// простые числа от и до 
function simpleNumber(min,max) {
    let result = []
    for (let index = min; index <= max; index++) {
        if(index%2){
            result.push(index)
        }
    }
    return result
}

// получить деапозон общих делителей 
function getRange(arr) {
    let result = [];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 2; j < arr[i]; j++) {
            if(arr[i]%j===0) {
                result.push(j)
            }
        }
    }
    return result.sort((a,b)=>a-b).filter((el,index)=>{
            if(result[index+1] !== el){
                count = 0;
                return false
            } else { ++count
            if(count === arr.length-1){ count = 0;
                return true} 
            }
        
    })
}
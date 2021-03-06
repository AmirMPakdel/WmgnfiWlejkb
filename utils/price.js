const price = {
    priceFormat,
    priceFormattoInteger,
    priceWithCurrency,
    rangePrice,
}

export default price;

export function priceFormat(string){

    let number = Number(string);

    if(isNaN(number)){
        return "";
    }

    number = number.toFixed(0);

    let num_str = number.toString();
    let new_str = "";

    let c = 0;
    for(let i = num_str.length-1; i>=0; i--){

        new_str += num_str[i];

        if(c === 2){
            if(i != 0){
                new_str += ",";
            }
            c = 0;
        }else{
            c++;
        }
    }

    let new_str2 = "";
    for(let i = new_str.length-1; i>=0; i--){
        new_str2 += new_str[i];
    }

    return new_str2;
}

export function priceFormattoInteger(str) {
    
    if(typeof str != 'string') return "";
    return str.split(",").join("");
}

export function priceWithCurrency(str){

    let num = Number(str);

    if(isNaN(num)){
        console.log(`${str} -> NaN`);
        return "0"+" تومن";
    }

    if(num >= 1000000000){
        num /= 1000000000;
        return num+" میلیارد";
    }

    if(num >= 1000000){
        num /= 1000000;
        return num+" میلیون";
    }

    return num+" تومن";
}

export function rangePrice(min, max){
    
    let unit = "میلیون";
    let startPrice = min/1000000;
    let endPrice = max/1000000;

    if(startPrice>=1000){
        startPrice/=1000;
    }
    if(endPrice >= 1000){
        endPrice/=1000;
        unit = "میلیارد";
    }
    return " "+startPrice+" "+" تا "+endPrice+" "+unit;
}

export function calcDiscountPercent(price, discount_price){

    if(discount_price){

        price = Number(price);
        discount_price = Number(discount_price);
        let p = 100 - (discount_price*100) / price;
        return Math.floor(p);
    }else{
        return 0;
    }
}


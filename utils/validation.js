import { perisanToEng } from "@/utils/persian";

export class IsValid {

    static phoneNumberIsValid(str, options={}){
        
        if(typeof str !== "string"){
            return false;
        }
        if(str.length != 11){
            return false;
        }
        if(str[0] !== "0" && str[1] !== "9"){
            return false;
        }
        return true;
    }

    static passwordIsValid(str, options={}){

        if(typeof str !== "string"){
            return false;
        }
        if(str.length < 8 || str.length > 64){
            return false;
        }
        return true;
    }

    static verificationCodeIsValid(str, options={}){

        if(!str || isNaN(Number(str))){
            return false;
        }
        if(str.length !== env.VERIFICATION_CODE_LENGTH){
            return false;
        }

        return true;
    }

    static tenantIsValid(str, options={}){

        if(!str){
            return false;
        }
        if(str.length < 3 || str.length > 32){
            return false;
        }
        return true;
    }

    static persianNameIsValid(str, options={}){

        if(!str){
            return false;
        }
        if(str.length < 2 || str.length > 32){
            return false;
        }
        return true;
    }

    static nationalCodeIsValid(str, options={}){

        let L=str.length;
        if(L<8 || parseInt(str,10)==0) return false;
        str=('0000'+str).substr(L+4-10);
        if(parseInt(str.substr(3,6),10)==0) return false;
        let c=parseInt(str.substr(9,1),10);
        let s=0;
        for(let i=0;i<9;i++)
            s+=parseInt(str.substr(i,1),10)*(10-i);
        s=s%11;
        return (s<2 && c==s) || (s>=2 && c==(11-s));
        return true;
    }
}

export class InputFilter {

    static integer(old_val, new_val){

        let obj = {
            value:old_val,
            error:false,
        }

        let num = Number(new_val);
        if(!isNaN(num) && num===Math.floor(num)){
            obj.value = new_val;
        }else{
            obj.error = "عدد صحیح وارد نمایید";
        }

        return obj;
    }

    static phoneNumberInputFilter(old_val, new_val){

        let obj = {value:old_val, error:false};

        new_val = perisanToEng(new_val);

        if(onlyNumber(new_val)){
            obj.value = new_val;
        }else{
            obj.error = "عدد وارد کنید";
        }

        return obj;
    }

    static passwordInputFilter(old_val, new_val){

        let obj = {value:old_val, error:false};

        new_val = perisanToEng(new_val);

        obj.value = new_val;

        return obj;
    }

    static verificationCodeInputFilter(old_val, new_val){

        let obj = {value:old_val, error:false};

        new_val = perisanToEng(new_val);

        obj.value = new_val;

        return obj;
    }

    static tenantInputFilter(old_val, new_val){

        //TODO: later
        let obj = {value:old_val, error:false};

        new_val = perisanToEng(new_val).trim();

        if(onlyEngWithNum(new_val)){

            obj.value = new_val;

        }else{

            obj.error = "حروف انگلیسی و اعداد بدون فاصله وارد کنید";
        }

        return obj;
    }

    static persianNameInputFilter(old_val, new_val){

        let obj = {
            value:old_val,
            error:false,
        }

        if(onlyPersianChar(new_val)){
            obj.value = new_val;
        }else{
            obj.error = "حروف را فارسی و بدون اعداد وارد کنید";
        }

        return obj;
    }

    static nationalCodeInputFilter(old_val, new_val){

        let obj = {value:old_val, error:false};

        new_val = perisanToEng(new_val);

        if(onlyNumber(new_val)){
            obj.value = new_val;
        }else{
            obj.error = "عدد وارد کنید";
        }

        return obj;
    }
}

export default class Validation{

    static phoneNumber(str, options={}){

        let res = IsValid.phoneNumberIsValid(str, options);

        if(res){
            return {valid:true, message:""}
        }else{
            return {valid:false, message:"شماره موبایل وارد شده نامعتبر است."}
        }
    }

    static password(str, options={}){

        let res = IsValid.passwordIsValid(str, options);

        if(res){
            return {valid:true, message:""}
        }else{
            return {valid:false, message:"رمزعبور وارد شده نامعتبر است."}
        }
    }

    static verificationCode(str, options={}){

        let res = IsValid.verificationCodeIsValid(str, options);

        if(res){
            return {valid:true, message:""}
        }else{
            return {valid:false, message:"کد تایید اشتباه است."}
        }
    }

    static tenant(str, options={}){

        let res = IsValid.tenantIsValid(str, options)

        if(res){
            return {valid:true, message:""}
        }else{
            return {valid:false, message:"نام سایت وارد شده نامعتبر است."}
        }
    }

    static persianName(str, options={}){

        let res = IsValid.persianNameIsValid(str, options)

        if(res){
            return {valid:true, message:""}
        }else{
            return {valid:false, message:"نام وارد شده نامعتبر است."}
        }
    }

    static nationalCode(str, options={}){

        let res = IsValid.nationalCodeIsValid(str, options)

        if(res){
            return {valid:true, message:""}
        }else{
            return {valid:false, message:"کدملی وارد شده نامعتبر است."}
        }
    }

}

export function onlyEngWithNum(str){

    if(str==="" || str===null || str===undefined){
        return true;
    }

    let p = /^[a-z A-Z 0-9]+$/;

    if (!p.test(str)) {
        return false;
    }

    return true;
}

export function onlyPersianChar(str){

    if(str==="" || str===null || str===undefined){
        return true;
    }

    let p = /^[\u0600-\u06FF\s]+$/;

    if (!p.test(str)) {
        return false;
    }

    return true;
}

export function onlyNumber(str){

    if(str==="" || str===null || str===undefined){
        return true;
    }

    let num = perisanToEng(str); 
    num = Number(num);

    if(isNaN(num)){
        return false;
    }
    
    return true;
}

export function persianWithNum(str){

    if(str==="" || str===null || str===undefined){
        return true;
    }

    let p = /^[\u0600-\u06FF\s 0-9]+$/;

    if (!p.test(str)) {
        return false;
    }

    return true;
}

export const persian_input_valid = function(t){

   let p = /^[\u0600-\u06FF\s]+$/;
   if (!p.test(str)) {
       return false;
   }else{
       return true;
   }
}
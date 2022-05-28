import { getCookie } from "./cookie";

const helpers = {
    getTenant,
    isDevEnv,
    createUserWebHref,
    createMinfoHref,
    existsInArray,
    toggleMultiSelect,
    getUrlPart,
    getParamByName,
}

export default helpers;

/**
 * @returns {Boolean}
*/
export function isDevEnv() {
    
    if(location.hostname === "localhost"){
        return true;
    }
    return false;
}

export function getTenant(){
    let tenant_name = null;
    // for testing and dev environment
    if(isDevEnv()){
        tenant_name = getCookie(env.TENANT_KEY);
    }else{ // for deployment environment
        let splited_hn = location.hostname.split(".");
        if(splited_hn.length == 3){
            tenant_name = splited_hn[0];
        }
    }
    return tenant_name;
}

export function createUserWebHref(href) {
    
    // for testing and dev environment
    if(isDevEnv()){

        return href;

    }else{ // for deployment environment

        let minfo_domain = env.DOMAIN;
        let minfo_d_arr = minfo_domain.split("://");
        minfo_d_arr[1] = this.state.subdomain+"."+minfo_d_arr[1];
        let website_domain = minfo_d_arr.join("://");
        if(href == "/"){return website_domain;}
        return website_domain + href;
    }
}

export function createMinfoHref(href) {
    
    // for testing and dev environment
    if(isDevEnv()){

        return href;

    }else{ // for deployment environment

        if(href == "/"){return env.DOMAIN}

        return env.DOMAIN + href;
    }
}

/** 
 * for multiselect fields
 * @param {string} value
 * @param {Array} array
 * @returns {Boolean}
 */
export function existsInArray(value, array){

    if(isNaN(Number(value))){

        if(array.indexOf(value) !== -1){
            return true;
        }else{
            return false;
        }

    }else{

        if(value && (array.indexOf(value.toString()) !== -1 || array.indexOf(Number(value)) !== -1)){
            return true;
        }else{
            return false;
        }
    }
}

/** 
 * for multiselect fields
 * @param {string} value 
 * @param {Array} array
 * @returns {Array}
 */
export function toggleMultiSelect(value, array){
    let i = array.indexOf(value);
    if(i !== -1){
        array.splice(i, 1);
        return array;
    }else{
        array.push(value);
        return array;
    }
}

/**
 * get one part of a url, part==1 returns the domain
 * @param {String} part
 * @returns {String}
 */
export function getUrlPart(part){
    let array = window.location.href.split("/");
    return(array[part+2]);
}

/**
 * get url-parameter by name
 * @param {String} name 
 * @param {String} url 
 * @returns {String}
 */
export function getParamByName(name, default_value = null, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return default_value;
    if (!results[2]) return default_value;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * convert object to FormData
 * @param {Object} object 
 * @returns {FormData}
 */
export function Object2FormData(object){

    let data = new FormData();
    
    Object.keys(object).forEach(e=>{
        data.set(e, object[e]);
    });

    return data;
}

export function fileType2Ext(file_type){

    switch(file_type){

        case "image/png":
            return "png";
        case "image/jpeg":
            return "jpg";
        case "video/mp4":
            return "mp4";
        case "audio/mpeg":
            return "mp3";
        default:
            console.log(file_type);
            let ex = file_type.split("/")[1];
            if(!ex){ex = file_type}
            return ex;
    }
}

export function findInJsonObj(obj, value, keyName="id"){

    let obj2 = {}
    Object.keys(obj).forEach((i)=>{

        if(obj[i][keyName] == value){

            obj2 = obj[i]
            return;
        }

    })

    return obj2;
}

export function findInJsonArray(jsonArray, value, keyName="id"){

    let obj = {}
    jsonArray.forEach((v)=>{

        if(v[keyName] == value){

            obj = v
            return;
        }
    })

    return obj;
}

export function setFaviconUrl(url){

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = url;
}

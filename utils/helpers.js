const helpers = {
    existsInArray,
    toggleMultiSelect,
    getUrlPart,
    getParamByName,
}

export default helpers;

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
export function getParamByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
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
        default:
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

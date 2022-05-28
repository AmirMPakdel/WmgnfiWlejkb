import { getTenant } from "./helpers";

/**
 * Storage is a localStorage handler that
 * allow us save a retrive objects
 */
export default class Storage{

    /**
     * storing data to browser storage
     * @param {string} key 
     * @param {Object} obj 
     * @param {number} expiration_date
     */
    static store=(key, obj, expiration_date)=>{

        if(!expiration_date){
            expiration_date = Date.now()+(1*60*60*1000);// 1 hour
        }

        let modified_obj = "";

        if(typeof obj === "object"){

            modified_obj = JSON.stringify(obj);

        }else if(typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean"){

            if(!obj.toString){
                
                if(env.ENVIRONMENT_MODE === "dev"){
                    alert("storing object can not be cast to string");
                }

                return;
            }

            modified_obj = obj.toString();

        }else{

            if(env.ENVIRONMENT_MODE === "dev"){
                alert("storing object type of "+typeof(obj)+" rejected");
            }

            return;
        }

        let tenant = getTenant();
        if(!tenant){tenant = "minfo"};
        let objectInfo = JSON.stringify({type:typeof(obj), exp:expiration_date, tenant});

        window.localStorage.setItem("__"+key, objectInfo);

        window.localStorage.setItem(key, modified_obj);

    }

    /**
     * retrive the data from browser storage
     * @param {string} key 
     * @returns {Object}
     */
    static retrive=(key)=>{

        let objectInfo_str = window.localStorage.getItem("__"+key);

        if(!objectInfo_str){
            return null;
        }

        let objectInfo = null;
        
        try{
            objectInfo = JSON.parse(objectInfo_str);
        }catch(e){
            console.log(e);
            Storage.remove(key);
            return null;
        }

        let {type, exp, tenant} = objectInfo;

        if(exp < Date.now()){
            //the data has been expired
            Storage.remove(key);
            return null;
        }

        let current_tenant = getTenant();
        if(!current_tenant){current_tenant = "minfo"};

        if(tenant != current_tenant){
            // data is not for this tenant
            Storage.remove(key);
            return null;
        }

        let obj = window.localStorage.getItem(key);

        if(type === "object"){

            try{
                return JSON.parse(obj);
            }catch(e){
                console.log(e);
                Storage.remove(key);
                return null;
            }

        }else if(type === "string"){

            return obj;

        }else if(type === "number"){

            try{
                return Number(obj);
            }catch(e){
                console.log(e);
                Storage.remove(key);
                return null;
            }

        }else if(type === "boolean"){

            if(obj === "true" || obj === "1" || obj === 1 || obj === true){

                return true;

            }else{

                return false;
            }

        }else{

            return null;
        }
    }

    /**
     * removes the data form browsers storage
     * @param {string} key 
     */
    static remove=(key)=>{
        
        window.localStorage.removeItem(key);

        window.localStorage.removeItem("__"+key);
    }

    /**
     * storing data to browser storage
     * @param {string} key 
     * @param {Object} obj 
     * @param {number} expiration_date
     */
    static set=(key, obj, expiration_date)=>{

        return Storage.store(key, obj, expiration_date);
    }

    /**
     * retrive the data from browser storage
     * @param {string} key 
     * @returns {Object}
     */
    static get=(key)=>{

        return Storage.retrive(key);
    }

    /**
     * removes the data form browsers storage
     * @param {string} key 
     */
     static delete=(key)=>{
        
        Storage.remove(key);
    }
}
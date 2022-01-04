
/**
 * Storage is a localStorage handler that
 * allow us save a retrive objects
 */
export default class Storage{

    /**
     * storing data to browser storage
     * @param {string} key 
     * @param {Object} obj 
     */
    static store=(key, obj)=>{

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

        window.localStorage.setItem("_type_"+key, typeof(obj));

        window.localStorage.setItem(key, modified_obj);

    }

    /**
     * retrive the data from browser storage
     * @param {string} key 
     * @returns {Object}
     */
    static retrive=(key)=>{

        let type = window.localStorage.getItem("_type_"+key);
        let obj = window.localStorage.getItem(key);

        if(type === "object"){

            return JSON.parse(obj);

        }else if(type === "string"){

            return obj;

        }else if(type === "number"){

            return Number(obj);

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

        window.localStorage.removeItem("_type_"+key);
    }
}
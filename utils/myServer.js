import axios from "axios";
import { getCookie } from "@/utils/cookie";
import { Object2FormData } from "@/utils/helpers";
import serverErrorHandler from "@/utils/myServer/serverErrorHandler";
import serverMediaFiles from "@/utils/myServer/serverMediaFiles";
import ServerUrls from "./myServer/serverUrls";

const TENANT_REQUIRED_PREFIXES = [
    env.PREFIXES.UTA,
    env.PREFIXES.PTA,
    env.PREFIXES.PSTA,
    env.PREFIXES.STA,
    env.PREFIXES.STIA,
]

const USER_TOKEN_REQUIRED_PREFIXES = [
    env.PREFIXES.UTA,
    env.PREFIXES.PTA,
]

const STUDENT_TOKEN_REQUIRED_REFIXES = [
    env.PREFIXES.PSTA,
    env.PREFIXES.STA,
    env.PREFIXES.STIA,
]

function transformConfig(method, url, data, config) {

    if(!config.noTenant){

        if(!config.headers){config.headers = {};}

        let tenant_is_required = false;

        TENANT_REQUIRED_PREFIXES.forEach(p=>{
            if(url.search(p) != -1){
                tenant_is_required = true;
            }
        });

        if(tenant_is_required){

            let tenant_name = null;

            // for testing and dev environment
            if(location.hostname === "localhost"){

                tenant_name = getCookie(env.TENANT_KEY);

            }else{ // for deployment environment

                let splited_hn = location.hostname.split(".");
                if(splited_hn.length == 3){
                    tenant_name = splited_hn[0];
                }
            }

            if(tenant_name){

                config.headers["X-TENANT"] = tenant_name;

            }else{

                window.location.href = env.PATHS.MINFO_SELECT_SITE;
            }
        }
    }

    if(!config.noToken){
        if(!config.params){config.params = {};}
    }

    return config;
}

function transformData(method, url, data, config) {

    if(!config.noToken){

        if(!data){data = {}};

        let token_is_set = false;

        STUDENT_TOKEN_REQUIRED_REFIXES.forEach(p=>{
            if(url.search(p) != -1){
                data["token"] = getCookie(env.STUDENT_TOKEN_KEY);
                token_is_set = true;
            }
        });

        if(!token_is_set){
            USER_TOKEN_REQUIRED_PREFIXES.forEach(p=>{
                if(url.search(p) != -1){
                    data["token"] = getCookie(env.TOKEN_KEY);
                }
            });
        }
    }

    if(config.formData){
        data = Object2FormData(data);
    }

    return data;
}

/**
 * 
 * @param {string} url 
 * @param {import("axios").AxiosRequestConfig} config 
 * @param {(err, data)=>{}} cb
 */
function Get(url, config, cb){

    config = transformConfig("GET", url, null, config);

    axios.get(url, config).then(res=>{

        serverErrorHandler.errorCheck(res.data, config);
        try{
            cb(null, res.data);
        }catch(e){
            console.log(e);
        }

    }).catch(e=>{
        console.log(e);
    });
}

/**
 * 
 * @param {string} url 
 * @param {object} data
 * @param {import("axios").AxiosRequestConfig} config
 * @param {(err, data)=>{}} cb
 */
function Post(url, data, config={}, cb){

    config = transformConfig("POST", url, null, config);

    data = transformData("POST", url, data, config);

    axios.post(url, data, config).then((res)=>{

        serverErrorHandler.errorCheck(res.data, config);
        try{
            cb(null, res.data);
        }catch(e){
            console.log(e);
        }

    }).catch((e)=>{
        console.log(e);
    });
}

const myServer = {
    Get,
    Post,
    urls: ServerUrls,
    MediaFiles: serverMediaFiles,
    ErrorHandler: serverErrorHandler,
}

export default myServer;
import axios from "axios";
import { getCookie } from "@/utils/cookie";
import { Object2FormData } from "@/utils/helpers";
import serverErrorHandler from "@/utils/myServer/serverErrorHandler";
import serverMediaFiles from "@/utils/myServer/serverMediaFiles";

const domain = env.DOMAIN;
const prefixes = env.PREFIXES;

const urls = {
    
    DOMAIN:domain,
    MEDIA_PREFIX:env.MEDIA_PREFIX,

    //minfo register
    MINFO_REGISTER_CHECK_PHONE_NUMBER: domain+prefixes.MA+"/user/checkphonenumber",
    MINFO_LOGIN_WITH_PASSWORD: domain+prefixes.MA+"/user/login",
    MINFO_REGISTER_SEND_VERIFICATION_CODE: domain+prefixes.MA+"/user/verificationcode/send",
    MINFO_REGISTER_CHECK_VERIFICATION_CODE: domain+prefixes.MA+"/user/verificationcode/check",
    MINFO_REGISTER_CHECK_TENANT: domain+prefixes.MA+"/user/tenant/check",
    MINFO_REGISTER_COMPLELTE_REGISTRATION: domain+prefixes.MA+"/user/register",

    // upload
    UPLOAD_GET_UPLOAD_KEY: domain+prefixes.UTA+"/upload/uploadkey",
    UPLOAD_COVERTOR_CHECK: env.CONVERTOR_DOMAIN+"/upload_check",
    UPLOAD_FILE_TO_CONVERTOR: env.CONVERTOR_DOMAIN+"/upload_progress",

    //minfo educators
    DASH_USER_INFO: domain+prefixes.UTA+"/profile/load",
    DASH_CREATE_EDUCATOR: domain+prefixes.UTA+"/educators/create",
    DASH_FETCH_EDUCATORS: domain+prefixes.UTA+"/educators/fetch",
    DASH_UPDATE_EDUCATOR: domain+prefixes.UTA+"/educators/update",
    DASH_DELETE_EDUCATOR: domain+prefixes.UTA+"/educators/delete",

    //course category
    CATEGORY_FETCH: domain+prefixes.PTA+"/categories/fetch",

    //course
    COURSE_CREATE: domain+prefixes.UTA+"/courses/create",
    COURSE_FETCH: domain+prefixes.UTA+"/course/load",
    COURSE_EDIT: domain+prefixes.UTA+"/course/edit/",
    COURSE_PUBLISH_REQUEST: domain+prefixes.MA+"/user/course/validation/check",

    //MyCourses
    MY_COURSES_FETCH: domain+prefixes.UTA+"/courses/fetch/",

    //TRANSACTION
    PAY_FOR_PRODUCT: domain+prefixes.UTA+"/product/page",
    GET_TRANSACTION: domain+prefixes.UTA+"/transaction/get",
}

/**
 * 
 * @param {string} url 
 * @param {import("axios").AxiosRequestConfig} config 
 * @param {(err, data)=>{}} cb
 */
function Get(url, config, cb){

    if(!config.noTenant){
        if(!config.headers){config.headers = {};}
        config.headers["X-TENANT"] = getCookie(env.TENANT_KEY);
    }

    if(!config.noToken){
        if(!config.params){config.params = {};}
        config.params["token"] = getCookie(env.TOKEN_KEY);
    }

    axios.get(url, config).then(res=>{

        serverErrorHandler.errorCheck(res.data);

        cb(null, res.data);

    }).catch(e=>{
        
        //TODO: handle this error

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

    if(!config.noTenant){
        if(!config.headers){config.headers = {};}
        config.headers["X-TENANT"] = getCookie(env.TENANT_KEY);
    }

    if(!config.noToken){
        if(!data){data = {}};
        data["token"] = getCookie(env.TOKEN_KEY);
    }

    if(config.formData){
        data = Object2FormData(data);
    }

    axios.post(url, data, config).then((res)=>{

        if(res.status == 200){

            serverErrorHandler.errorCheck(res.data);

            cb(null, res.data);
        }

    }).catch((e)=>{

        //TODO: handle this error 
    });
}

const myServer = {
    urls,
    Get,
    Post,
    MediaFiles: serverMediaFiles,
    ErrorHandler: serverErrorHandler,
}

export default myServer;
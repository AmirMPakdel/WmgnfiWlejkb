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

    //global
    PORTALS_LIST: domain+prefixes.MA+"/portals/get",
    GET_COURSE_CATEGORIES: domain+prefixes.PTA+"/groups/fetch/gt_course",

    //user register
    MINFO_REGISTER_CHECK_PHONE_NUMBER: domain+prefixes.MA+"/user/checkphonenumber",
    MINFO_LOGIN_WITH_PASSWORD: domain+prefixes.MA+"/user/login",
    MINFO_REGISTER_SEND_VERIFICATION_CODE: domain+prefixes.MA+"/user/verificationcode/send",
    MINFO_REGISTER_CHECK_VERIFICATION_CODE: domain+prefixes.MA+"/user/verificationcode/check",
    MINFO_REGISTER_CHECK_TENANT: domain+prefixes.MA+"/user/tenant/check",
    MINFO_REGISTER_COMPLELTE_REGISTRATION: domain+prefixes.MA+"/user/register",

    //user upload
    UPLOAD_GET_UPLOAD_KEY: domain+prefixes.UTA+"/upload/uploadkey",
    UPLOAD_COVERTOR_CHECK: env.CONVERTOR_DOMAIN+"/upload_check",
    UPLOAD_FILE_TO_CONVERTOR: env.CONVERTOR_DOMAIN+"/upload_progress",

    //user educators
    DASH_USER_INFO: domain+prefixes.UTA+"/profile/load",
    DASH_CREATE_EDUCATOR: domain+prefixes.UTA+"/educators/create",
    DASH_FETCH_EDUCATORS: domain+prefixes.UTA+"/educators/fetch",
    DASH_UPDATE_EDUCATOR: domain+prefixes.UTA+"/educators/update",
    DASH_DELETE_EDUCATOR: domain+prefixes.UTA+"/educators/delete",

    //user groups
    DASH_CREATE_GROUP_L1: domain+prefixes.UTA+"/levelonegroups/create",
    DASH_EDIT_GROUP_L1: domain+prefixes.UTA+"/levelonegroups/edit",
    DASH_DELETE_GROUP_L1: domain+prefixes.UTA+"/levelonegroups/delete",
    DASH_CREATE_GROUP_L2: domain+prefixes.UTA+"/leveltwogroups/create",
    DASH_EDIT_GROUP_L2: domain+prefixes.UTA+"/leveltwogroups/edit",
    DASH_DELETE_GROUP_L2: domain+prefixes.UTA+"/leveltwogroups/delete",
    DASH_CREATE_GROUP_L3: domain+prefixes.UTA+"/levelthreegroups/create",
    DASH_EDIT_GROUP_L3: domain+prefixes.UTA+"/levelthreegroups/edit",
    DASH_DELETE_GROUP_L3: domain+prefixes.UTA+"/levelthreegroups/delete",

    //user edit homepage
    DASH_EDIT_HOMEPAGE: domain+prefixes.UTA+"/mainpage/edit/",
    DASH_LOAD_HOMEPAGE: domain+prefixes.UTA+"/mainpage/load",

    //user course category
    CATEGORY_FETCH: domain+prefixes.PTA+"/categories/fetch",

    //user course
    COURSE_CREATE: domain+prefixes.UTA+"/courses/create",
    COURSE_FETCH: domain+prefixes.UTA+"/course/load",
    COURSE_EDIT: domain+prefixes.UTA+"/course/edit/",
    COURSE_PUBLISH_REQUEST: domain+prefixes.MA+"/user/course/validation/check",

    //user MyCourses
    MY_COURSES_FETCH: domain+prefixes.UTA+"/courses/fetch/",

    //user transaction
    CREATE_TRANSACTION: domain+prefixes.UTA+"/transaction/generate",
    OPEN_TRANSACTION_PORTAL: domain+prefixes.UTA+"/product/pay",
    GET_TRANSACTION: domain+prefixes.UTA+"/transaction/get",

    //student homepage
    STD_LOAD_HOMEPAGE: domain+prefixes.PSTA+"/main/load",
    STD_HOMEPAGE_COURSE_LIST: domain+prefixes.PSTA+"/main/course_list/load",

    //store
    STORE_COURSES: domain+prefixes.PSTA+"/store/fetch/",

    //student auth
    STD_CHECK_PHONENUMBER: domain+prefixes.PSTA+"/checkphonenumber",
    STD_LOGIN: domain+prefixes.PSTA+"/login",
    STD_SEND_VERIFICATION_CODE: domain+prefixes.PSTA+"/verificationcode/send",
    STD_CHECK_VERIFICATION_CODE: domain+prefixes.PSTA+"/verificationcode/check",
    STD_REGISTRATION: domain+prefixes.PSTA+"/register",

    //student profile
    STD_PROFILE: domain+prefixes.STA+"/profile/load",
    STD_UPDATE_PROFILE: domain+prefixes.STA+"/profile/update",

    //student panel
    STD_COURSES_LIST: domain+prefixes.STA+"/courses/fetch/",
    STD_WISHLIST: domain+prefixes.STA+"/courses/favorite/",
    STD_RECIEPTS: domain+prefixes.STA+"/transaction/get/list/",

    //student course
    STD_VIEW_COURSE: domain+prefixes.STA+"/course/load",
    STD_ADD_WISHLIST: domain+prefixes.STA+"/course/favorite/add",
    STD_REMOVE_WISHLIST: domain+prefixes.STA+"/course/favorite/remove",
    STD_GET_COURSE_SCORE: domain+prefixes.STA+"/course/score/get",
    STD_SET_COURSE_SCORE: domain+prefixes.STA+"/course/score/update",

    //student transaction
    STD_CREATE_TRANSACTION: domain+prefixes.STA+"/transaction/generate",
    STD_GET_TRANSACTION: domain+prefixes.STA+"/transaction/get",
    STD_OPEN_TRANSACTION_PORTAL: domain+prefixes.STA+"/course/pay",
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
    }

    axios.get(url, config).then(res=>{

        serverErrorHandler.errorCheck(res.data, config);

        try{
            cb(null, res.data);
        }catch(e){
            console.log(e);
        }

    }).catch(e=>{
        
        //TODO: handle this error
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

    if(!config.noTenant){
        if(!config.headers){config.headers = {};}
        config.headers["X-TENANT"] = getCookie(env.TENANT_KEY);
    }

    if(!config.noToken){
        if(!data){data = {}};

        if( url.search(env.PREFIXES.PSTA) == -1 && url.search(env.PREFIXES.STA) == -1){
            data["token"] = getCookie(env.TOKEN_KEY);
        }else{
            data["token"] = getCookie(env.STUDENT_TOKEN_KEY);
        }
    }

    if(config.formData){
        data = Object2FormData(data);
    }

    axios.post(url, data, config).then((res)=>{

        if(res.status == 200){

            serverErrorHandler.errorCheck(res.data, config);

            try{
                cb(null, res.data);
            }catch(e){
                console.log(e);
            }
        }

    }).catch((e)=>{

        //TODO: handle this error 
        console.log(e);
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
import { getCookie } from "@/utils/cookie"
import myServer from "@/utils/myServer"

const MediaFiles = {

    publicImage:(uploadKey, type)=>{

        if(uploadKey)
            return `${myServer.urls.MEDIA_PREFIX}/public_files/${getCookie(env.TENANT_KEY)}/${uploadKey}.jpg`;

        return "/statics/default_img/default_"+type+".png";
    },

    publicVideo:(uploadKey)=>{
        
        return `${myServer.urls.MEDIA_PREFIX}/public_files/${getCookie(env.TENANT_KEY)}/${uploadKey}.mp4`
    },

}

export default MediaFiles;
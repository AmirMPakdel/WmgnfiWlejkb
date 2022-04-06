import { getCookie } from "@/utils/cookie"
import myServer from "@/utils/myServer"

const MediaFiles = {

    publicImage:(uploadKey, type)=>{

        let ext = uploadKey.split("-")[1];

        if(uploadKey)
            return `${myServer.urls.MEDIA_PREFIX}/public_files/${getCookie(env.TENANT_KEY)}/${uploadKey}.${ext}`;

        return "/statics/default_img/default_"+type+".png";
    },

    publicVideo:(uploadKey)=>{

        let ext = uploadKey.split("-")[1];
        
        return `${myServer.urls.MEDIA_PREFIX}/public_files/${getCookie(env.TENANT_KEY)}/${uploadKey}.${ext}`;
    },

}

export default MediaFiles;
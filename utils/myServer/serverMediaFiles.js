import { getCookie } from "@/utils/cookie";
import myServer from "@/utils/myServer";
import { getTenant } from "../helpers";

const type_map = {
    "mp4":"a",
    "png":"b",
    "mp3":"c",
    "jpg":"d",
    "svg":"e",
    "pdf":"f",
    "gif":"g",
    "ogg":"h"
}

const MediaFiles = {

    publicImage:(uploadKey, type)=>{

        if(uploadKey){

            let type_char = uploadKey.split("-")[1][0];
            let ext = null;

            Object.keys(type_map).forEach(type => {
                if(type_map[type] == type_char){
                    ext = type;
                }
            });

            if(ext){

                return `${myServer.urls.MEDIA_PREFIX}/public_files/${getTenant()}/${uploadKey}.${ext}`;
            }
        }

        return "/statics/default_img/default_"+type+".png";
    },

    publicVideo:(uploadKey)=>{

        if(uploadKey){

            let type_char = uploadKey.split("-")[1][0];
            let ext = null;

            Object.keys(type_map).forEach(type => {
                if(type_map[type] == type_char){
                    ext = type;
                }
            });

            if(ext){

                return `${myServer.urls.MEDIA_PREFIX}/public_files/${getTenant()}/${uploadKey}.${ext}`;
            }
        }

        return null;
    },

    freeCourseMedia:(uploadKey, tenant)=>{

        if(!tenant){
            tenant = getTenant();
        }

        let type_char = uploadKey.split("-")[1][0];
        let ext = null;

        Object.keys(type_map).forEach(type => {
            if(type_map[type] == type_char){
                ext = type;
            }
        });

        return `${myServer.urls.MEDIA_PREFIX}/course_media/${tenant}/${uploadKey}.${ext}`;
    },

    courseMedia:(course_id, content_id, upload_key)=>{

        let username = getTenant();
        let token = getCookie(env.STUDENT_TOKEN_KEY);
        return env.MEDIA_PREFIX+"/download_student_course_item_2.php?"+
            "username="+username+"&token="+token+"&content_id="+content_id+
            "&course_id="+course_id+"&upload_key="+upload_key;
    }

}

export default MediaFiles;
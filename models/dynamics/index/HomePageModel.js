import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";
import { handleFirstTimeIntroData } from "../dashboard/HomePageModel";

export default class HomePageModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getElements(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.STD_LOAD_HOMEPAGE, params, {}, (err, data)=>{

            if(!err){
            
                try{

                    let d = data;

                    let footer_data = {
                        footer_app_links: d.footer_app_links,
                        footer_links: d.footer_links,
                        footer_telephones: d.footer_telephones,
                    }

                    //saving or updating mainpage footer data
                    Storage.store("footer", footer_data);
        
                    let constElements = [
                        {
                            id:"intro", title:"نمایی کلی و مختصر", el_type:1, visible:1,
                        },
                        {
                            id:"footer", title:"اطلاعات سایت و لینک ها", el_type:2, visible:1,
                        },
                    ]
        
                    d.contents.forEach(content => {
                        content.el_type = 4;
                    });
        
                    d.course_lists.forEach(course => {
                        course.el_type = 3;
                    });

                    let elements = constElements.concat(d.contents);
                    elements = elements.concat(d.course_lists);
        
                    if(!d.content_hierarchy){
                        d.content_hierarchy = "\"intro-1,footer-2\"";
                    }
                    d.content_hierarchy = d.content_hierarchy.split('\"')[1];
                    d.content_hierarchy = d.content_hierarchy.split(",");
        
                    let data2 = {
                        hierarchy: d.content_hierarchy,
                        elements,
                    }
        
                    //create intro object
                    d.intro = {
                        cover: d.page_cover,
                        has_link: d.page_cover_has_link,
                        link: d.page_cover_link,
                        link_title: d.page_cover_link_title,
                        template: d.page_cover_template,
                        text: d.page_cover_text,
                        title: d.page_cover_title,
                    }
        
                    //set default values if its first time
                    d.intro = handleFirstTimeIntroData(d.intro);
        
                    delete d.content_hierarchy;
                    delete d.contents;
                    delete d.course_lists;
                    delete d.page_cover;
                    delete d.page_cover_has_link;
                    delete d.page_cover_link;
                    delete d.page_cover_link_title;
                    delete d.page_cover_template;
                    delete d.page_cover_text;
                    delete d.page_cover_title;
        
                    Object.assign(data2, d);
        
                    let data3 = {
                        result_code: env.SC.SUCCESS,
                        data: data2
                    }
        
                    console.log(data3);
        
                    if(!err){
                    
                        cb(null, data3);
                    
                    }else{
                    
                        myServer.ErrorHandler.type1(err);
                    }
                    }catch(e){
        
                        console.log(e);
                    }
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}
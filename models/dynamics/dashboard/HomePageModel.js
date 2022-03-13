import myServer from "@/utils/myServer";

export default class HomePageModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getElements(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:getFakeElements(),
                    });
            }, 1000, cb);
            return;
        }

        myServer.Post(myServer.urls.DASH_LOAD_HOMEPAGE, params, {}, (err, data)=>{

            try{

            let d = data;

            let constElements  = [
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
            elements.concat(d.course_lists);

            let data2 = {
                hierarchy: d.content_hierarchy || newHierarchy,
                elements,
            }

            

            delete d.content_hierarchy;
            delete d.contents;
            delete d.course_lists;

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
        });
    }
}

const newHierarchy = [
    "intro", "footer"
]

const getFakeElements = ()=>{
    return {
        hierarchy:[1,3,4,5,6,2],
        elements:[
            {
                id:1, title:"نمایی کلی و مختصر", type:1, visible:1,
            },
            {
                id:2, title:"اطلاعات سایت و لینک ها", type:2, visible:1,
            },
            {
                id:5, title:"جدیدترین دوره ها", type:3, visible:0,
            },
            {
                id:3, title:"پرفروش ترین دروه ها", type:3, visible:1,
            },
            {
                id:4, title:"همکاری با ما", type:4, visible:1,
            },
            {
                id:6, title:"درباره ما", type:4, visible:1,
            },
        ]
    }
}
import myServer from "@/utils/myServer";

export default class HomePageModel{
    
    /**
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
        });
    }

     /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    saveElementsHierarchy(params, cb){

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 1000, cb);
            return;
        }

        let str_hierarchy = params.hierarchy.join(",");
        params.hierarchy = str_hierarchy;

        myServer.Post(myServer.urls.DASH_EDIT_HOMEPAGE+env.EP.EDIT_PARAM_CONTENT_HIERARCHY, params, {}, (err, data)=>{

            if(!err){
                cb(null, data);
            }else{
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

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

export const handleFirstTimeIntroData = (intro_data)=>{

    if(intro_data.template){
        return intro_data;
    }

    intro_data = {
        cover: null,
        has_link: false,
        link: null,
        link_title: null,
        template: 1,
    }
    
    return intro_data;
}

const default_intro_text = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی .دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد";
const default_intro_title = "به سایت آموزشی من خوش آمدید";
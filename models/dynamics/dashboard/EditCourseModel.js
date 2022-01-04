import myServer from "@/utils/myServer";
import _ from "lodash"
import { findInJsonArray } from "@/utils/helpers";

export default class EditCourseModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCourse(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    // data: _.cloneDeep(fake_CourseItem),
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.COURSE_FETCH, params, {}, (err, data)=>{
    
            if(!err){
            
                //validation check
                if(!data.data.subjects){
                    data.data.subjects = [];
                }else{
                    data.data.subjects = JSON.parse(data.data.subjects);
                    console.log(data.data.subjects);
                }

                if(!data.data.requirements){
                    data.data.requirements = [];
                }else{
                    data.data.requirements = JSON.parse(data.data.requirements);
                    console.log(data.data.requirements);
                }

                if(!data.data.validation_status_message){
                    data.data.validation_status_message = [];
                }

                data.data.content_hierarchy = apiContentHierarchy2MyHierarchy(data.data);

                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}

function apiContentHierarchy2MyHierarchy(data){

    let ch = data.content_hierarchy;

    if(!ch){
        
        return {
            children:[],
        };
        
    }else{

        let temp = JSON.parse(ch);

        let mych = {
            children:[],
        }

        temp.forEach((v,i)=>{

            mych.children.push({

                id: v.h_id,
                title: findInJsonArray(data.headings, v.h_id).title,
                children: v.content_ids.map((c_id)=>{

                    return findInJsonArray(data.contents, c_id);
                })
            });
        });

        return mych;
    }
}

const fake_IntroVideo = {
    "id": 1,
    "url":"http://",
    "size": 23430005,
}

const fake_Heading = {
    "id": 1,
    "title": "heading 1",
}

const fake_Content = {
    "id":1,
    "url":"http://",
    "title": "توابع زوج و فرد",
    "type": "ct_video",//enum("ct_video"|"ct_document"|"ct_voice"),
    "is_free": 0, //number|b,
    "size": 4324234, //number,
}

const fake_Educator = {
    "id": 1,
    "first_name": "علی",
    "last_name": "محمدیان",
    "bio": "سلام من علی محمدیان هستم و اینجا ...",
}

const fake_CourseItem = {
    "id": 1,
    "title": "آموزش ابتدایی ریاضیات",
    "price": 400000,
    "sells": 26,
    "score": 4.2,
    "visits_count": 42000,
    "validation_status": "not_valid", // |is_checking|valid),
    "validation_status_message": "blah blah blah blah blah blah blah blah blah blah ",
    "g1":1,
    "g2":1,
    "g3":1,
    "tags":[1,2,3,4,5],
    "duration":240 , //min
    "has_discount": 1, // 1 or 0
    "discount": 20, //percent
    "holding_status": "is_holding",//enum(coming_soon|is_holding|finished),
    "release_date": "1401-08-23",//string|f:yyyy-mm-dd,
    "subjects": ["subjec1", "subject2", "subject3"],// Array(string),
    "short_desc": "blah blah blah blah blah blah blah blah blah blah ".repeat(5),
    "long_desc": "blah blah blah blah blah blah blah blah blah blah ".repeat(90),
    "requirements":["blah blah", "blah blahblah blah", "blah blah", "blah blahblah blah", "blah blah", "blah blahblah blah", "blah blah", "blah blahblah blah"],
    //"suggested_courses":Array(number),  "decription: It's an array of course ids",
    //"suggested_posts":Array(number),  "decription: It's an array of post ids",
    "is_encrypted": 1,//number|b,
    "intro_video": fake_IntroVideo,
    "content_hierarchy":"some hierarchy blah blah",
    "headings": [fake_Heading, fake_Heading, fake_Heading],//Array[Heading],
    "contents": [fake_Content, fake_Content, fake_Content, fake_Content],//Array[Content],
    "educators": [fake_Educator, fake_Educator],//Array[Educator],
    "logo": "f987sdf89sdsdff9w9-2ri9",//string, "decription: upload_key"
    "cover": "9845try589sdsdff9w9-2ri9",//string, "decription: upload_key"
}


import myServer from "@/utils/myServer";

export default class ManageStudentsModel{

    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCourses(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.MY_COURSES_FETCH+"999/1", params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCourseStudents(params, cb){
    
        if(env.MOCKING_SERVER || 0){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:FakeCourseStudentsData(params.course_id)});
            }, 2000, cb);
            return;
        }
    
        let chunk = params.chunk;
        let page = params.page;
        delete params.chunk;
        delete params.page;

        

        myServer.Post(myServer.urls.GET_COURSE_STUDENTS+chunk+"/"+page, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

const fakeStudentList = (course_id)=>{
    if(course_id){
        return [
            {
                "key":1,
                "id":1,
                "first_name": "امیرمحمد",
                "last_name": "پاکدل",
                "phone_number": "09118015081",
                "national_code": "2581095598",
                "access": 1,
            },
        ]
    }else{
        return[
            {
                "key":1,
                "id":1,
                "first_name": "امیرمحمد",
                "last_name": "پاکدل",
                "phone_number": "09118015081",
                "national_code": "2581095598",
                "access": 1,
            },{
                "key":2,
                "id":2,
                "first_name": "هاشم",
                "last_name": "مصطفوی",
                "phone_number": "09126875046",
                "national_code": "2661095598",
                "access": 1,
            },{
                "key":3,
                "id":3,
                "first_name": "اکبر",
                "last_name": "مولایی",
                "phone_number": "09388015081",
                "national_code": "0381095598",
                "access": 1,
            },
        ]
    }
}

const FakeCourseStudentsData = (id)=>{
    let list = fakeStudentList(id);
    return{
        total_size: list.length,
        list: fakeStudentList(id),
    }
}
import myServer from "@/utils/myServer";

export default class ManageStudentsModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCourseStudents(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:FakeCourseStudentsData});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.SOME_URL, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }   
}

const fakeStudentList = ()=>{
    let list = [];
    for(let i=0; i<20; i++){
        list.push({
            "id":i+1,
            "first_name": "امیرمحمد",
            "last_name": "پاکدل",
            "phone_number": "09118015081",
            "national_code": "2581095598",
            "access": 1,
        })
    }
    return list;
}

const FakeCourseStudentsData = {
    total_size: 30,
    list: fakeStudentList(),
}
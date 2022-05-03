import myServer from "@/utils/myServer";

export default class CourseListModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCourseList(params, cb){
    
        if(env.MOCKING_SERVER || 0 ){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:fakeCouseList});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.STD_HOMEPAGE_COURSE_LIST, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }   
}

const fakeCouseList = [
    {
        "id": 9,
        "title": "جمعبندی ریاضیات کنکور",
        "price": 7800000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 8,
        "title": "شیمی کامل کنکور",
        "price": 900000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 7,
        "title": "فیزیک کامل کنکور",
        "price": 800000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 6,
        "title": "ریاضیات و حسابان کنکور",
        "price": 450000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 5,
        "title": "آموزش مقدماتی QT با ++C برای دانشجویان",
        "price": 650000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 4,
        "title": "دوره آموزشی Laravel سطح مبتدی",
        "price": 700000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 3,
        "title": "دوره آموزش php پیشرفته",
        "price": 1200000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 2,
        "title": "دوره آموزش ++C از سطح ابتدایی تا پیشرفته",
        "price": 720000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
    {
        "id": 1,
        "title": "کلیات حسابان کنکور",
        "price": 6500000,
        "sells": 0,
        "score": 0,
        "visits_count": 0
    },
]
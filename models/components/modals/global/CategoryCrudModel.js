import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";

export default class CategoryCrudModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCategories(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data: fakeData(),
                });
            }, 2000, cb);
            return;
        }
        
        let categories = Storage.get("categories");
        if(categories){

            cb(null, {
                result_code:env.SC.SUCCESS,
                data: categories,
            });

            return;
        }
    
        myServer.Get(myServer.urls.GET_COURSE_CATEGORIES, {}, (err, data)=>{
    
            if(!err){
            
                Storage.store("categories", data.data);
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
    createGroup(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data: fakeData(),
                });
            }, 2000, cb);
            return;
        }

        let url = myServer.urls.DASH_CREATE_GROUP_L1;
        if(params.level == 2){
            url = myServer.urls.DASH_CREATE_GROUP_L2;
        }else if(params.level == 3){
            url = myServer.urls.DASH_CREATE_GROUP_L3;
        }
        params.level = undefined;
        params.type = "gt_course";

        myServer.Post(url, params,{}, (err, data)=>{
    
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
    editGroup(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data: fakeData(),
                });
            }, 2000, cb);
            return;
        }

        let url = myServer.urls.DASH_EDIT_GROUP_L1;
        if(params.level == 2){
            url = myServer.urls.DASH_EDIT_GROUP_L2;
        }else if(params.level == 3){
            url = myServer.urls.DASH_EDIT_GROUP_L3;
        }
        params.level = undefined;

        myServer.Post(url, params,{}, (err, data)=>{
    
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
    deleteGroup(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data: fakeData(),
                });
            }, 2000, cb);
            return;
        }

        let url = myServer.urls.DASH_DELETE_GROUP_L1;
        if(params.level == 2){
            url = myServer.urls.DASH_DELETE_GROUP_L2;
        }else if(params.level == 3){
            url = myServer.urls.DASH_DELETE_GROUP_L3;
        }
        params.level = undefined;

        myServer.Post(url, params,{}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

const fakeData = ()=>{
    return [
        {
            "level": 1,
            "id": 1,
            "title" : "???????? ????????????????",
            "groups": [
                {
                    "level": 2,
                    "id": 65,
                    "title": "??????????",
                    "groups": [
                        {
                            "level": 3,
                            "id": 82,
                            "title": "?????????? 1",
                        },
                        {
                            "level": 3,
                            "id": 84,
                            "title": "?????????? 2",
                        },
                        {
                            "level": 3,
                            "id": 85,
                            "title": "????????????",
                        },
                    ]
                },
                {
                    "level": 2,
                    "id": 66,
                    "title": "??????????",
                    "groups": [
                        {
                            "level": 3,
                            "id": 102,
                            "title": "?????????? 1",
                        },
                    ]
                },
                {
                    "level": 2,
                    "id": 68,
                    "title": "????????????",
                    "groups": [
                        {
                            "level": 3,
                            "id": 109,
                            "title": "???????????? 2",
                        },
                        {
                            "level": 3,
                            "id": 110,
                            "title": "???????????? 3",
                        },
                    ]
                }
            ]
        },
        {
            "level": 1,
            "id": 2,
            "title" : "???????? ?????? ??????????",
            "groups": [
                {
                    "level": 2,
                    "id": 205,
                    "title": "??????????",
                    "groups": [
                        {
                            "level": 3,
                            "id": 216,
                            "title": "???????? ??????????",
                        },
                        {
                            "level": 3,
                            "id": 218,
                            "title": "?????????? ??????????",
                        },
                        {
                            "level": 3,
                            "id": 219,
                            "title": "?????????? ?? ????????????",
                        },
                        {
                            "level": 3,
                            "id": 316,
                            "title": "???????? ??????????",
                        },
                        {
                            "level": 3,
                            "id": 318,
                            "title": "?????????? ??????????",
                        },
                        {
                            "level": 3,
                            "id": 319,
                            "title": "?????????? ?? ????????????",
                        },
                        {
                            "level": 3,
                            "id": 320,
                            "mode": "add",
                        }
                    ]
                },
            ]
        },
    ]
}
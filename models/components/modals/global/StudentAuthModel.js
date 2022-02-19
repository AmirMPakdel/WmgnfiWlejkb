import myServer from "@/utils/myServer";

export default class StudentAuthModel{
    
    /**
     * 
     * @param {object} params
     * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
     */
     getPhoneNumberCheck(params, cb){

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                //cb(null, {result_code:env.SC.SUCCESS});
                cb(null, {result_code:env.SC.REPETITIVE_PHONE_NUMBER});
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.STD_CHECK_PHONENUMBER, params, {}, (err, data)=>{

            if(!err){

                cb(null, data);

            }else{

                myServer.ErrorHandler.type1(err);
            }

        });
    }

    /**
     * 
     * @param {object} params
     * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
     */
    getLoginWithPassword(params, cb){

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS, 
                    data:{
                        token : "j38j5j3409j4355034h6hh3t8hwdfho08",
                        username : "امیرمحمد پاکدل"
                    }
                })
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.STD_LOGIN, params, {}, (err, data)=>{

            if(!err){

                cb(null, data);

            }else{

                myServer.ErrorHandler.type1(err);
            }
        });
    }

    /**
     * 
     * @param {object} params
     * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
     */
    getSendVerificationCode(params, cb){

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                })
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.STD_SEND_VERIFICATION_CODE, params, {}, (err, data)=>{

            if(!err){

                cb(err, data);

            }else{

                myServer.ErrorHandler.type1(err);
            }

        });
    }

    /**
     * 
     * @param {object} params
     * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
     */
    getCheckVerificationCode(params, cb){

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:{user_id:1},
                })
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.STD_CHECK_VERIFICATION_CODE, params, {}, (err, data)=>{

            if(!err){

                cb(null, data);
            
            }else{

                myServer.ErrorHandler.type1(err);
            }
        });
    }

    /**
     * 
     * @param {object} params
     * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
     */
    getCompeleteRegisteration(params, cb){

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:{
                        token:"93yt93j3yt4j45j2440923j4092f0j4f0934",
                    }
                });
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.STD_REGISTRATION, params, {}, (err,data)=>{

            if(!err){

                cb(null, data);
            
            }else{

                myServer.ErrorHandler.type1(err);
            }

        })
    }
}
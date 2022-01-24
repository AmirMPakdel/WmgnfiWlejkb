import myServer from "@/utils/myServer";

export default class StudentAuthModel{
    
    /**
     * 
     * @param {object} params
     * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
     */
     getPhoneNumberCheck(params, cb){

        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                //cb(null, {result_code:env.SC.SUCCESS});
                cb(null, {result_code:env.SC.REPETITIVE_PHONE_NUMBER});
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.MINFO_REGISTER_CHECK_PHONE_NUMBER, params, {}, (err, data)=>{

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

        if(env.MOCKING_SERVER || 1){
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

        myServer.Post(myServer.urls.MINFO_LOGIN_WITH_PASSWORD, params, {}, (err, data)=>{

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

        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                })
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.MINFO_REGISTER_SEND_VERIFICATION_CODE, params, {}, (err, data)=>{

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

        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:{user_id:1},
                })
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.MINFO_REGISTER_CHECK_VERIFICATION_CODE, params, {}, (err, data)=>{

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
    getCheckUsername(params, cb){

        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                if(Math.random() > 0.5){
                    cb(null, {result_code:env.SC.SUCCESS});
                }else{
                    cb(null, {result_code:env.SC.REPETITIVE_USERNAME});
                }
            }, 2000, cb);
            return;
        }

        myServer.Get(myServer.urls.MINFO_REGISTER_CHECK_TENANT+"/"+params.username, {}, (err, data)=>{

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

        if(env.MOCKING_SERVER || 1){
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

        myServer.Post(myServer.urls.MINFO_REGISTER_COMPLELTE_REGISTRATION, params, {}, (err,data)=>{

            if(!err){

                cb(null, data);
            
            }else{

                myServer.ErrorHandler.type1(err);
            }

        })
    }
}
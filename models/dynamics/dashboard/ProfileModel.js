import myServer from "@/utils/myServer";

export default class ProfileModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getUserProfile(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:FAKE_USER_PROFILE_DATA});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.DASH_USER_INFO, params, {}, (err, data)=>{
    
            if(!err){

                let d = data.data;
                if(!d.email){d.email=""};
                if(!d.account_owner_first_name){d.account_owner_first_name=""};
                if(!d.account_owner_last_name){d.account_owner_last_name=""};
                if(!d.bank){d.bank=""};
                if(!d.account_number){d.account_number=""};
                if(!d.shaba_number){d.shaba_number=""};
                if(!d.credit_cart_number){d.credit_cart_number=""};
                data.data = d;
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
    updateUserBaseInfo(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.DASH_EDIT_USER_INFO, params, {}, (err, data)=>{
    
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
    getNationalCardUploadKey(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.UPLOAD_GET_UPLOAD_KEY, params, {}, (err, data)=>{
    
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
    checkNationalCardUploadKey(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.UPLOAD_COVERTOR_CHECK, params, {}, (err, data)=>{
    
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
    uploadNationalCardImage(params, cb){

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.UPLOAD_FILE_TO_CONVERTOR, params, {formData:true}, (err, data)=>{
    
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
    updateUserBankAccountInfo(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.DASH_EDIT_USER_BANK_INFO, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

const FAKE_USER_PROFILE_DATA = {
    first_name: "امیراکبر",
    last_name: "حاجیان",
    phone_number: "09118015081",
    email: "so.mgf@gmail.com",
    state: null,
    city: null,
    national_code: "2581095598",
    national_card: null,
    ao_first_name: "امیراکبر",
    ao_last_name:"حاجیان",
    bank_name:"پارسیان",
    account_number: "9546500084084",
    shaba: "IR5064800000009546500084084",
    a_card_number: "6037845465044",
}
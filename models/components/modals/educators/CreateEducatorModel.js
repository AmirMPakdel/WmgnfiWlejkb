import myServer from "@/utils/myServer";

export default class CreateEducatorModel{

    /**
     * 
     * @param {object} params
     * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
     */
    creatingEducator(params, cb){

        if(env.SC.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:{ educator_id: 1}
                });
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.DASH_CREATE_EDUCATOR, params, {formData:true}, (err, data)=>{

            if(!err){

                cb(null, data);

            }else{

                myServer.ErrorHandler.type1(err);
            }

        });
    }
}
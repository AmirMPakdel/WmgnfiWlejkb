import myServer from "@/utils/myServer";

export default class EducatorsCrudModel{

    /**
     * 
     * @param {object} params
     * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
     */
    fetchEducators(params, cb){

        if(env.SC.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:[]
                });
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.DASH_FETCH_EDUCATORS, params, {}, (err, data)=>{

            if(!err){

                cb(null, data);

            }else{

                myServer.ErrorHandler.type1(err);
            }

        });
    }
}
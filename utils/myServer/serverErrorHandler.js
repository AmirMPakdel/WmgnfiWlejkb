import chest from "@/utils/chest";

const ErrorHandler = {

    type1:(error)=>{
        console.log(error);
    },

    errorCheck:(data, config)=>{

        if(config.hideError){
            return;
        }

        if(data.result_code === env.SC.REPETITIVE_PHONE_NUMBER){
            return;
        }

        if(data.result_code !== env.SC.SUCCESS && data.result_code !== env.CSC.SUCCESS){

            Object.keys(env.SC).forEach(e=>{
                if(env.SC[e] === data.result_code){
                    chest.openNotification(e, "error")
                }
            })

            Object.keys(env.CSC).forEach(e=>{
                if(env.CSC[e] === data.result_code){
                    chest.openNotification(e, "error")
                }
            })
        }
    }
}

export default ErrorHandler;
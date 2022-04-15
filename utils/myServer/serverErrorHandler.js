import chest from "@/utils/chest";

const ErrorHandler = {

    type1:(error)=>{
        console.log(error);
    },

    errorCheck:(data, config)=>{

        if(config.hideError){
            return;
        }

        let should_skip = false;

        RESULT_CODE_ERRORS_BLACKLIST.forEach(e=>{
            if(data.result_code === e){should_skip = true}
        });

        if(should_skip){
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

const RESULT_CODE_ERRORS_BLACKLIST = [
    env.SC.REPETITIVE_PHONE_NUMBER,
    env.SC.INVALID_TOKEN,
]

export default ErrorHandler;
import chest from "@/utils/chest";
import StudentAuthModal from "@/views/components/modal/global/StudentAuthModal";

const ErrorHandler = {

    type1:(error)=>{
        console.log(error);
    },

    errorCheck:(data, config)=>{

        if(data.result_code === env.SC.INVALID_TOKEN){

            USER_AUTHENTICATION_REQUIRED_URLS.forEach(pn=>{
                if(pn.test(window.location.pathname)){
                    window.location.href = env.PATHS.USER_AUTHENTICATION;
                }
            });

            STUD_AUTHENTICATION_REQUIRED_URLS.forEach(pn=>{
                if(pn.test(window.location.pathname)){
                    chest.ModalLayout.setAndShowModal(1, <StudentAuthModal closable={false}/>)
                }
            });
        }

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
];

const USER_AUTHENTICATION_REQUIRED_URLS = [
    /^\/dashboard/,
]

const STUD_AUTHENTICATION_REQUIRED_URLS = [
    /^\/stdPanel/,
]

export default ErrorHandler;
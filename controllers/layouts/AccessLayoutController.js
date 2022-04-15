import UserModel from "@/models/global/UserModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import Observer from "@/utils/observer";
import StudentAuthModal from "@/views/components/modal/global/StudentAuthModal";
import AccessLayout from "@/views/layouts/AccessLayout";

export default class AccessLayoutController{
    
    /**@param {AccessLayout} view*/
    constructor(view){

        this.view = view;

        this.model = new UserModel();
    }

    loadUser(){
        
        let showWithoutAuth = this.view.props.showWithoutAuth;

        let utoken = getCookie(env.TOKEN_KEY);

        if(!utoken && !showWithoutAuth){
            window.location.href = env.PATHS.USER_AUTHENTICATION+"?redirected=1";
            return;
        }
        
        this.model.getUser(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let user = data.data;

                chest.user = user;

                Observer.execute("onUserChange", user);
                Observer.execute("onAuthenticate", student);

                this.view.setState({
                    loading: false,
                    authenticated: true,
                });

            }else if(showWithoutAuth){

                this.view.setState({
                    loading: false,
                    authenticated: false,
                });

            }else{

                window.location.href = env.PATHS.USER_AUTHENTICATION+"?redirected=1";
            }
        });
    }

    loadStudent(){

        let showWithoutAuth = this.view.props.showWithoutAuth;

        let stoken = getCookie(env.STUDENT_TOKEN_KEY);

        if(!stoken && !showWithoutAuth){

            Observer.add("onStudentChange", (student)=>{
                this.view.setState({
                    loading: false,
                    authenticated: true,
                });
            });

            setTimeout(()=>{
                console.log(chest.ModalLayout.setAndShowModal);
                chest.ModalLayout.setAndShowModal(1, <StudentAuthModal closable={false}/>);
            }, 600);
            
            return;
        }

        this.model.getStudent(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let student = data.data;

                chest.student = student;

                Observer.execute("onStudentChange", student);
                Observer.execute("onAuthenticate", student);

                this.view.setState({
                    loading: false,
                    authenticated: true,
                });

            }else if(showWithoutAuth){

                this.view.setState({
                    loading: false,
                    authenticated: false,
                });

            }else{

                chest.ModalLayout.setModal(1, <StudentAuthModal/>, ()=>{
                    chest.ModalLayout.visibleToggle(1, true);
                });
            }
        });
    }
}
import CourseInvoiceModel from "@/models/dynamics/index/CourseInvoiceModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { getTenant, getUrlPart } from "@/utils/helpers";
import myServer from "@/utils/myServer";
import CourseInvoice from "@/views/dynamics/index/CourseInvoice";

export default class CourseInvoiceController{
    
    /**@param {CourseInvoice} view*/
    constructor(view){
        this.view = view;
        this.model = new CourseInvoiceModel();
    }
    
    initialize(){

        let params = {
            course_id: getUrlPart(2)
        };

        this.model.getCourse(params, (err1, data1)=>{

            if(data1.result_code === env.SC.SUCCESS){

                try{
                this.model.getPortals({}, (err2, data2)=>{

                    if(data2.result_code === env.SC.SUCCESS){

                        let course = data1.data;
                        let portals = data2.data;

                        this.view.setState({
                            loading:false,
                            course,
                            portals,
                        });

                        this.setupPageTitle(course);
                    }
                });
                }catch(e){console.log(e);}
            }
        });
    }

    setupPageTitle(course){

        document.title = "پیش فاکتور خرید  "+course.title+" | مینفو";
    }

    onConfirm(){
        
        let v = this.view;
        let vs = v.state;

        v.setState({confirm_loading:true});

        let params1 = {
            title: "خرید "+vs.course.title,
            // student:{
            //     first_name:vs.student.first_name,
            //     last_name:vs.student.last_name,
            // },
            price: vs.course.price,
            course_id: vs.course.id,
            course_title: vs.course.title,
            portal:vs.selected_portal,
            redirect_url: window.location.origin+"/transaction/buyCourse",
        };

        this.model.createTransaction(params1, (err1, data1)=>{

            let d = data1.data;
            if(data1.result_code === env.SC.SUCCESS){

                window.location.href = myServer.urls.STD_OPEN_TRANSACTION_PORTAL+
                `?transaction_id=${d.id}&`+
                `tenant=${getTenant()}&`+
                `token=${getCookie(env.STUDENT_TOKEN_KEY)}`
            }

            v.setState({confirm_loading:false});
        });
    }

    onFreeRegisterConfirm=()=>{

        if(this.lock_register){return};

        let v = this.view;
        v.setState({confirm_loading:true});

        this.lock_register = true;

        let params = {
            course_id: getUrlPart(2)
        }

        this.model.freeRegister(params, (err, data)=>{
            
            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("ثبت نام در دروه با موفقیت انجام گردید.", "success");

                setTimeout(()=>{
                    window.location.href = env.PATHS.STUDENT_COURSES;
                }, 2000);

                v.setState({confirm_loading:false});

            }else{

                this.lock_register = false;
                v.setState({confirm_loading:false});
            }
        });
    }
}
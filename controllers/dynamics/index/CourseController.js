import CourseModel from "@/models/dynamics/index/CourseModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { getUrlPart } from "@/utils/helpers";
import Storage from "@/utils/storage";
import Course from "@/views/dynamics/index/Course";

export default class CourseController{
    
    /**@param {Course} view*/
    constructor(view){
        this.view = view;
        this.model = new CourseModel();
    }
    
    getCourse=()=>{

        this.view.setState({loading:true});

        let params={
            course_id:getUrlPart(2),
        }

        this.model.getCourse(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                data.data.subjects = JSON.parse(data.data.subjects);
                data.data.requirements = JSON.parse(data.data.requirements);

                this.view.setState({
                    loading:false,
                    course: data.data,
                });

                this.setupPageTitle(data.data)
            }
        });
    }

    setupPageTitle(course){
        
        let site_title = "";
        let site_info = Storage.get("site_info");
        if(site_info && site_info.page_title){
            site_title = " | "+ site_info.page_title;
        }
        document.title = "فروش "+course.title+site_title+" | مینفو";
    }

    addToWishlist(){

        if(!getCookie(env.STUDENT_TOKEN_KEY)){

            chest.openNotification("برای افزودن دوره به لیست علاقه مندی ها ابتدا وارد حساب کاربری خود شوید.", "alert");
            return;
        }

        let v = this.view;
        if(v.fav_btn_lock){return};

        v.fav_btn_lock = true;

        v.state.course.is_favorite = 1;
        v.setState(v.state);

        let params = {
            course_id: getUrlPart(2)
        }

        this.model.addToWishlist(params, (err, data)=>{

            if(data.result_code !== env.SC.SUCCESS){

                v.state.course.is_favorite = 0;
                v.setState(v.state);
            }

            this.view.fav_btn_lock = false;
        });
    }

    removeFromWishlist(){

        let v = this.view;
        if(v.fav_btn_lock){return};

        v.fav_btn_lock = true;

        v.state.course.is_favorite = 0;
        v.setState(v.state);

        let params = {
            course_id: getUrlPart(2)
        }

        this.model.removeFromWishlist(params, (err, data)=>{

            if(data.result_code !== env.SC.SUCCESS){

                v.state.course.is_favorite = 1;
                v.setState(v.state);
            }

            this.view.fav_btn_lock = false;
        });
    }

    
    
}
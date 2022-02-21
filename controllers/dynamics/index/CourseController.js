import CourseModel from "@/models/dynamics/index/CourseModel";
import { getUrlPart } from "@/utils/helpers";
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

                console.log(data.data.subjects);
                this.view.setState({
                    loading:false,
                    course: data.data,
                })
            }
        });
    }

    addToWishlist(){

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
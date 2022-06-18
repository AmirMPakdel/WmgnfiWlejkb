import PreviewCourseModel from "@/models/dynamics/dashboard/PreviewCourseModel";
import { getUrlPart } from "@/utils/helpers";
import PreviewCourse from "@/views/dynamics/dashboard/PreviewCourse";

export default class PreviewCourseController{
    
    /**@param {PreviewCourse} view*/
    constructor(view){
        this.view = view;
        this.model = new PreviewCourseModel();
    }
    
    getCourse=()=>{

        this.view.setState({loading:true});

        let params={
            course_id:getUrlPart(3),
        }

        this.model.getCourse(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                data.data.subjects = JSON.parse(data.data.subjects);
                data.data.requirements = JSON.parse(data.data.requirements);

                this.view.setState({
                    loading:false,
                    course: data.data,
                })
                
                this.setupPageTitle(data.data);
            }
        });
    }

    setupPageTitle(course){
        
        document.title = "پیش نمایش دوره " +course.title + " | داشبورد کاربر "+"| مینفو ";
    }
    
}
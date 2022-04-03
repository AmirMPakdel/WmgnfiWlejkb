import CourseListModel from "@/models/components/homePage/CourseListModel";
import CourseList from "@/views/components/homePage/CourseList";

export default class CourseListController{
    
    /**@param {CourseList} view*/
    constructor(view){
        this.view = view;
        this.model = new CourseListModel();
    }
    
    loadCourses(){

        let v = this.view;
        let d = v.props.data;

        // *inputs*
        // course_list_id:number
        // default_type:enum("dt_most_visited"|"dt_most_sell"|"dt_most_score"|"dt_most_newest")
        // groups:GroupInput

        let params = {
            course_list_id: d.id,
            default_type: d.default_type,
        }

        this.model.getCourseList(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                
            }
        });
    }
    
}
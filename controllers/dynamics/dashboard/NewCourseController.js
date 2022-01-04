import NewCourseModel from "@/models/dynamics/dashboard/NewCourseModel";
import NewCourse from "@/views/dynamics/dashboard/NewCourse";

export default class NewCourseController{
    
    /**@param {NewCourse} view*/
    constructor(view){
        this.view = view;
        this.model = new NewCourseModel();
    }
    
    getInitialData(){

        this.view.setState({step:"loading"});

        let params = {};

        this.model.getCategories(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                this.view.setState({
                    categories: data.data,
                    step: 1,
                }, ()=>{
                    console.log(this.view.state.categories);
                })
            }
        });
    }
    
}
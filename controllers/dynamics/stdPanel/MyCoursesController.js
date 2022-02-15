import MyCoursesModel from "@/models/dynamics/stdPanel/MyCoursesModel";
import MyCourses from "@/views/dynamics/stdPanel/MyCourses";

export default class MyCoursesController{
    
    /**@param {MyCourses} view*/
    constructor(view){
        this.view = view;
        this.model = new MyCoursesModel();
    }

    loadCoursePage(page){

        this.view.setState({
            loading:true
        });

        this.model.getMyCourses(null, (err, data)=>{

            let d = data.data;
            if(data.result_code === env.SC.SUCCESS){
                this.view.setState({
                    loading:false,
                    list: d.list,
                    total: d.total,
                    currentPage: page,
                })
            }
        })
    }
}
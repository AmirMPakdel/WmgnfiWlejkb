import ManageStudentsModel from "@/models/dynamics/dashboard/ManageStudentsModel";
import chest from "@/utils/chest";
import ManageStudents from "@/views/dynamics/dashboard/ManageStudents";

export default class ManageStudentsController{
    
    /**@param {ManageStudents} view*/
    constructor(view){
        this.view = view;
        this.model = new ManageStudentsModel();
    }

    getCourseList=(cb)=>{

        this.model.getCourses(null, (err, data)=>{

            if(data.result_code == env.SC.SUCCESS){

                let list = data.data.list;
                let courseList = [{id: null, title:"همه"}];
                list.forEach(e=>{
                    courseList.push({id:e.id, title:e.title})
                });

                cb(courseList);
            }
        });
    }
    
    loadData=(course_id=null, page=1)=>{

        this.view.setState({loading:true});

        let params = {
            course_id
        };

        this.model.getCourseStudents(params, (err, data)=>{

            if(data.result_code == env.SC.SUCCESS){

                let d = data.data;

                this.view.setState({
                    loading:false,
                    data:d.list,
                    total: d.total_size,
                    current_page:page,
                });
            }
        });
    }

    onCourseSelect=(obj)=>{

        if(this.view.state.selected_course.id == obj.id){
            return;
        }

        this.view.setState({
            selected_course:obj
        });

        this.loadData(obj.id);
    }

    onAddStudent=()=>{

        if(!this.view.state.selected_course.id){
            chest.openNotification("برای اضافه کردن دانش آموز ابتدا دوره مورد نظرتان را انتخاب کنید.", "alert");
            return;
        }

        
    }
    
}
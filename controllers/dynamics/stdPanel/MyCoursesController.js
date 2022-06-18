import MyCoursesModel from "@/models/dynamics/stdPanel/MyCoursesModel";
import MyCourses from "@/views/dynamics/stdPanel/MyCourses";

export default class MyCoursesController{
    
    /**@param {MyCourses} view*/
    constructor(view){
        this.view = view;
        this.model = new MyCoursesModel();
    }

    loadCoursePage(page){

        window.scrollTo(null, 0);
        
        let v = this.view;
        let vs = v.state;

        v.setState({
            loading:true
        });

        let params={
            chunk_count: vs.pageSize,
            page_count: page,
        }

        this.model.getMyCourses(params, (err, data)=>{

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

        this.setupPageTitle();
    }

    setupPageTitle(){

        document.title = "دوره های من"+" | پنل دانش آموز "+" | مینفو";
    }
}
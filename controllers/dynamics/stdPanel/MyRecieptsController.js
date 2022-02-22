import MyRecieptsModel from "@/models/dynamics/stdPanel/MyRecieptsModel";
import MyReciepts from "@/views/dynamics/stdPanel/MyReciepts";

export default class MyRecieptsController{
    
    /**@param {MyReciepts} view*/
    constructor(view){
        this.view = view;
        this.model = new MyRecieptsModel();
    }
    
    loadMyRecieptPage(page){

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

        this.model.getMyReciepts(params, (err, data)=>{

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
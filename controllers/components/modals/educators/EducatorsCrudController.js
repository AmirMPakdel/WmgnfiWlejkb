import EducatorsCrudModel from "@/models/components/modals/educators/EducatorsCrudModel";
import EducatorsCrudModal from "@/views/components/modal/educators/EducatorsCrudModal";

export default class EducatorsCrudController{
    
    /**@param {EducatorsCrudModal} CreateEducatorView*/
    constructor(CreateEducatorView){

        this.view = CreateEducatorView;

        this.model = new EducatorsCrudModel();
    }

    loadEducators(){

        this.view.setState({loading:true});

        this.model.fetchEducators({}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let list = tableFormat(data.data);

                this.view.setState({
                    loading:false,
                    list,
                })
            }
        })
    }

}

function tableFormat(data){
    
    data.forEach(e=>{
        e.key = e.id;
    })

    return data;
}
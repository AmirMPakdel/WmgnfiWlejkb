import EditSitesTitlesModel from "@/models/components/modals/settings/EditSitesTitlesModel";
import EditSitesTitlesModal from "@/views/components/modal/settings/EditSitesTitlesModal";

export default class EditSitesTitlesController{
    
    /**@param {EditSitesTitlesModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditSitesTitlesModel();
    }
    
    loadSiteTitle(){

        let v = this.view;
        
        let params = {};

        this.model.getData(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                v.setState({
                    loading:false,
                    title: "سایت من",
                    slogan: null,
                })
            }
        });
    }

    saveSiteInfo(){

        let v = this.view;

        let res = checkInputs();

        if(res){

            v.setState({confirm_loading:true});

            let params={
                title: v.state.title,
                slogan: v.state.slogan,
            }

            this.model.save(params, (e))

        }
    }
}
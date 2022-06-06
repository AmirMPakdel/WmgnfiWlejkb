import IndexFooterModel from "@/models/components/layouts/IndexFooterModel";
import Observer from "@/utils/observer";
import Storage from "@/utils/storage";
import IndexFooter from "@/views/components/layouts/IndexFooter";

export default class IndexFooterController{
    
    /**@param {IndexFooter}} view*/
    constructor(view){
        this.view = view;
        this.model = new IndexFooterModel();
    }
    
    fetchData(){

        let footer_data = Storage.get("footer");

        if(footer_data){

            let footer_data_comp = {
                links: JSON.parse(footer_data.footer_links),
                numbers: JSON.parse(footer_data.footer_telephones),
                app_links: footer_data.footer_app_links,
            }

            Observer.execute("onFooterChange", footer_data_comp);

        }else{

            this.model.getData(null, (err, data)=>{

                if(!err){
    
                    let footer_data_store = {
                        footer_app_links: data.footer_app_links,
                        footer_links: data.footer_links,
                        footer_telephones: data.footer_telephones,
                    }
    
                    Storage.store("footer", footer_data_store);
    
                    let footer_data_comp = {
                        links: JSON.parse(footer_data_store.footer_links),
                        numbers: JSON.parse(footer_data_store.footer_telephones),
                        app_links: footer_data.footer_app_links,
                    }

                    Observer.execute("onFooterChange", footer_data_comp);
                }
            });
        }
    }
    
}
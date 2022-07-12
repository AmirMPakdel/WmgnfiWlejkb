import HomePageModel from "@/models/dynamics/index/HomePageModel";
import { setMetaTag } from "@/utils/helpers";
import Observer from "@/utils/observer";
import Storage from "@/utils/storage";
import HomePage from "@/views/dynamics/index/HomePage";
import { extractFooterData, normalizeHierarchy, sortElementsBasedOnHierarchy } from "../dashboard/HomePageController";

export default class HomePageController{
    
    /**@param {HomePage} view*/
    constructor(view){
        this.view = view;
        this.model = new HomePageModel();
    }
    
    loadElements(cb){

        let v = this.view;

        this.model.getElements({}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                Observer.execute("onSiteInfoChange", d);

                d.hierarchy = normalizeHierarchy(d.hierarchy, d.elements);
                
                let elements = sortElementsBasedOnHierarchy(d.elements, d.hierarchy);

                let footer = extractFooterData(d);

                d = setShowDefaultHomePage(d, elements);

                v.setState({
                    loading:false,
                    show_default: d.show_default,
                    elements,
                    intro: d.intro,
                    hierarchy: d.hierarchy,
                }, ()=>{

                    let footer_data = {
                        links: JSON.parse(footer.footer_links),
                        numbers: JSON.parse(footer.footer_telephones),
                    }

                    Observer.execute("onFooterChange", footer_data);

                    if(cb){cb()};
                });
            }
        });
    }

    
}

function setShowDefaultHomePage(data, elements) {

    if(data.cover == null && elements.length == 2){

        data.show_default = true;
    }else{
        data.show_default = false;
    }
    return data;
}
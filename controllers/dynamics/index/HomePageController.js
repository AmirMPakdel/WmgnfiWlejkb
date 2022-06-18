import HomePageModel from "@/models/dynamics/index/HomePageModel";
import Observer from "@/utils/observer";
import HomePage from "@/views/dynamics/index/HomePage";
import { extractFooterData, normalizeHierarchy, sortElementsBasedOnHierarchy } from "../dashboard/HomePageController";

export default class HomePageController{
    
    /**@param {HomePage} view*/
    constructor(view){
        this.view = view;
        this.model = new HomePageModel();
    }
    
    loadElements(){

        let v = this.view;

        this.model.getElements({}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                d.hierarchy = normalizeHierarchy(d.hierarchy, d.elements);
                let elements = sortElementsBasedOnHierarchy(d.elements, d.hierarchy);

                let footer = extractFooterData(d);

                v.setState({
                    loading:false,
                    elements,
                    intro: d.intro,
                    hierarchy: d.hierarchy,
                }, ()=>{

                    let footer_data = {
                        links: JSON.parse(footer.footer_links),
                        numbers: JSON.parse(footer.footer_telephones),
                    }

                    Observer.execute("onFooterChange", footer_data);

                    this.setupPageTitle();
                });
            }
        });
    }

    setupPageTitle(){
        
        document.title = "سایت فروش دوره های آموزشی "+" | مینفو";
    }
}
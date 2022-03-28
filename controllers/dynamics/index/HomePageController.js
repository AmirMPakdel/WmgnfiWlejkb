import HomePageModel from "@/models/dynamics/index/HomePageModel";
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

                v.setState({
                    loading:false,
                    elements,
                    intro: d.intro,
                    footer: extractFooterData(d),
                    hierarchy: d.hierarchy,
                });

                console.log(d.hierarchy);
            }
        });
    }
    
}
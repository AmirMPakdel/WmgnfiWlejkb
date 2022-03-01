import HomePageModel from "@/models/dynamics/dashboard/HomePageModel";
import HomePage from "@/views/dynamics/dashboard/HomePage";

export default class HomePageController{
    
    /**@param {HomePage} view*/
    constructor(view){
        this.view = view;
        this.model = new HomePageModel();
    }
    
    getElements(){

        let v = this.view;
        v.setState({loading:true});

        this.model.getElements({}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;
                v.setState({
                    loading:false,
                    elements: this.sortElementsBasedOnHierarchy(d.elements, d.hierarchy),
                    hierarchy: d.hierarchy,
                })
            }

        });
    }

    sortElementsBasedOnHierarchy(elements, hierarchy){

        let newEle = [];

        hierarchy.forEach(h => {
            
            elements.forEach(e => {

                if(e.id == h){
                    newEle.push(e);
                }
            });
        });

        return newEle;
    }

    onSortElements(){

        this.view.setState({sortMode: true});
    }

    onCancelSortElements(){

        this.view.setState({sortMode: false});
    }
    
}
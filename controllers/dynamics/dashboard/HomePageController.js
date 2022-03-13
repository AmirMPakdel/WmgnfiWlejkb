import HomePageModel from "@/models/dynamics/dashboard/HomePageModel";
import chest from "@/utils/chest";
import AddEditCourseListElementModal from "@/views/components/modal/editHomePage/AddEditCourseListElementModal";
import AddEditInfoBoxElementModal from "@/views/components/modal/editHomePage/AddEditInfoBoxElementModal";
import AddElementSelectModal from "@/views/components/modal/editHomePage/AddElementSelectModal";
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

                //TODO:handle
                d.hierarchy = ["intro", 1, 2, "footer"];

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

    onAddNewElement(){

        chest.ModalLayout.setAndShowModal( 1,
            <AddElementSelectModal 
            onCancel={this.onCancelAddNewElement}
            onContinue={this.onContinueAddNewElement}/>
        );
    }

    onCancelAddNewElement(){
        
        chest.ModalLayout.closeAndDelete(1);
    }

    onContinueAddNewElement(type){

        let modal = null;

        if(type === "3"){
            modal = <AddEditInfoBoxElementModal
            mode="add"/>
        }else if(type === "4"){
            modal = <AddEditCourseListElementModal
            mode="add"/>
        }

        chest.ModalLayout.setAndShowModal(1, modal);
    }
    
}
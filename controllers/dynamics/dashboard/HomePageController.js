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
                d.hierarchy = createHierarchy(d);

                v.setState({
                    loading:false,
                    elements: this.sortElementsBasedOnHierarchy(d.elements, d.hierarchy),
                    footer: extractFooterData(d),
                    hierarchy: d.hierarchy,
                });
            }

        });
    }

    sortElementsBasedOnHierarchy(elements, hierarchy){

        let newEle = [];

        hierarchy.forEach(h => {
            
            let arr = h.split("-");
            let h_id = arr[0];
            let h_type = arr[1];

            elements.forEach(e => {

                if(e.id == h_id && e.el_type == h_type){
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
            parent={this.view}
            onCancel={this.onCancelAddNewElement}
            onContinue={this.onContinueAddNewElement}/>
        );
    }

    onCancelAddNewElement(){
        
        chest.ModalLayout.closeAndDelete(1);
    }

    onContinueAddNewElement=(type)=>{

        let modal = null;

        if(type === "3"){

            modal = 
            <AddEditInfoBoxElementModal
            parent={this.view}
            mode="add"/>

        }else if(type === "4"){

            modal = 
            <AddEditCourseListElementModal
            parent={this.view}
            mode="add"/>
        }

        chest.ModalLayout.setAndShowModal(1, modal);
    }
    
}

const createHierarchy=(data)=>{

    let h = ["intro-1"];

    let elements = Object.assign([], data.elements);

    elements.forEach((el)=>{

        if(el.el_type==1 || el.el_type==2){return}

        h.push(el.id+"-"+el.el_type);
    });

    h.push("footer-2");

    return h;
}

const extractFooterData=(data)=>{

    return {
        footer_links: data.footer_links,
        footer_telephones: data.footer_telephones,
    };
}
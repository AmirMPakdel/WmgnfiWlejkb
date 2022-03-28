import HomePageModel from "@/models/dynamics/dashboard/HomePageModel";
import chest from "@/utils/chest";
import AddEditCourseListElementModal from "@/views/components/modal/editHomePage/AddEditCourseListElementModal";
import AddEditInfoBoxElementModal from "@/views/components/modal/editHomePage/AddEditInfoBoxElementModal";
import AddElementSelectModal from "@/views/components/modal/editHomePage/AddElementSelectModal";
import HomePage from "@/views/dynamics/dashboard/HomePage";
import _ from "lodash";

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

                d.hierarchy = normalizeHierarchy(d.hierarchy, d.elements);
                let elements = sortElementsBasedOnHierarchy(d.elements, d.hierarchy);

                v.setState({
                    loading:false,
                    elements,
                    new_elements: _.cloneDeep(elements),
                    intro: d.intro,
                    footer: extractFooterData(d),
                    hierarchy: d.hierarchy,
                    new_hierarchy: _.cloneDeep(d.hierarchy),
                });
            }
        });
    }

    onSortElements(){

        this.view.setState({sortMode: true});
    }

    onCancelSortElements(){

        let vs = this.view.state;
        let newState = {
            new_elements: _.cloneDeep(vs.elements),
            new_hierarchy: _.cloneDeep(vs.hierarchy),
            sortMode: false,
        }
        this.view.setState(newState);
    }

    onConfirmSortElements(){
        
        let v = this.view;
        let vs = v.state;
        
        let params={
            hierarchy: v.state.new_hierarchy,
        }

        this.model.saveElementsHierarchy(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let newState = {
                    elements: _.cloneDeep(vs.new_elements),
                    hierarchy: _.cloneDeep(vs.new_hierarchy),
                    sortMode: false,
                }
                this.view.setState(newState);
                chest.openNotification("ترتیب آیتم های نمایشی با موفقیت ویرایش شد.", "success");
            }
        });
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

/**
 * @param {Array} hierarchy 
 * @param {Array} elements 
 */
export const normalizeHierarchy=(hierarchy, elements)=>{

    let h = hierarchy;

    if(!h || !h[0] || h.length<2 || h[0]!="intro-1" || h[h.length-1]!="footer-2"){
        return createHierarchy(elements);
    }

    let norm_h = [];

    h.forEach((v,i)=>{

        if(i==0){
            norm_h.push("intro-1");
            return;
        }

        if(i==h.length-1){
            //dont push footer-2 just now
            return;
        }

        elements.forEach((e,ei)=>{
            let sort_key = e.id+"-"+e.el_type;
            if(sort_key == v){
                norm_h.push(sort_key);
            }
        });
    });

    elements.forEach((e,ei)=>{

        let sort_key = e.id+"-"+e.el_type;
        let exists = false;
        h.forEach((v,i)=>{

            if(v == sort_key){
                exists = true;
            }
        });

        if(!exists){
            norm_h.push(sort_key);
        }
    })

    norm_h.push("footer-2");

    return norm_h;
}

const createHierarchy=(elements)=>{

    let h = ["intro-1"];

    let new_elements = Object.assign([], elements);

    new_elements.forEach((el)=>{

        if(el.el_type==1 || el.el_type==2){return}

        h.push(el.id+"-"+el.el_type);
    });

    h.push("footer-2");

    return h;
}

export const sortElementsBasedOnHierarchy=(elements, hierarchy)=>{

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

export const extractFooterData=(data)=>{

    return {
        footer_links: data.footer_links,
        footer_telephones: data.footer_telephones,
    };
}
import CategoryCrudModel from "@/models/components/modals/global/CategoryCrudModel";
import chest from "@/utils/chest";
import { onlyPersianChar, persianWithNum } from "@/utils/validation";
import AskDeleteCategoryModal from "@/views/components/modal/global/AskDeleteCategoryModal";
import CategoryCrudModal from "@/views/components/modal/global/CategoryCrudModal";
import _ from "lodash";

export default class CategoryCrudModalController{
    
    /**@param {CategoryCrudModal} view*/
    constructor(view){
        this.view = view;
        this.model = new CategoryCrudModel();
    }
    
    loadCategories(){

        let v = this.view;
        v.setState({loading:true});

        this.model.getCategories(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                v.setState({
                    loading:false,
                    list:data.data,
                    old_list:_.cloneDeep(data.data),
                });

            }
        })
    }

    addChild(node, level){

        let v = this.view;

        if(v.editingNode){
            //empty the single editing input if avalible
            v.editingNode.value = "";
        }

        let newList = _.cloneDeep(v.state.old_list);

        let newNode = {mode:"add", id:"input"}

        if(!node){
            newList.push(newNode);
        }else if(level == 1){
            newList.forEach((l1, i1)=>{
                if(l1.id===node.id){
                    if(!l1.groups){l1.groups=[]}
                    l1.groups.push(newNode);
                }
            });
        }else if(level == 2){
            newList.forEach((l1)=>{
                l1.groups.forEach((l2)=>{
                    if(l2.id===node.id){
                        if(!l2.groups){l2.groups=[]}
                        l2.groups.push(newNode);
                    }
                });
            });
        }

        console.log("addChild", newList);
        v.setState({list: newList});
    }

    submitChild(node, level, parent_node){

        let title = this.view.editingNode.value;
        if(!persianWithNum(title)){
            chest.openNotification("عنوان وارد شده معتبر نیست", "error");
            return;
        }

        let params = {level, title};

        if(level==2){
            params.g1_id = parent_node.id
        }else if(level==3){
            params.g2_id = parent_node.id
        }

        this.model.createGroup(params, (err, data)=>{

            if(data.result_code===env.SC.SUCCESS){

                let id = (data.data.g1 | data.data.g2 | data.data.g3);
                let newNode={id, title, level}

                let v = this.view;
                let list = _.cloneDeep(v.state.list);
                if(node.mode == "add"){
                    if(level===1){
                        list.forEach((l1, i1)=>{
                            if(l1.id === "input"){
                                l1.id=newNode.id;
                                l1.mode=undefined;
                                l1.level=newNode.level;
                                l1.title=newNode.title;
                            }
                        });
                    }else if(level===2){
                        list.forEach((l1)=>{
                            l1.groups.forEach((l2, i2)=>{
                                if(l2.id === "input"){
                                    l2.id=newNode.id;
                                    l2.mode=undefined;
                                    l2.level=newNode.level;
                                    l2.title=newNode.title;
                                }
                            });
                        });
                    }else if(level===3){
                        list.forEach((l1)=>{
                            l1.groups.forEach((l2)=>{
                                l2.groups.forEach((l3, i3)=>{
                                    if(l3.id === "input"){
                                        l3.id=newNode.id;
                                        l3.mode=undefined;
                                        l3.level=newNode.level;
                                        l3.title=newNode.title;
                                    }
                                });
                            });
                        });
                    }
                }
                console.log("submitChild", list);
                v.setState({list, old_list:list}, ()=>{
                    chest.openNotification("دسته جدید با عنوان"+"\""+title+"\""+" اضافه شد.", "success");
                });
            }
        });
    }

    deleteChild(node, level, parent_node){

        if(node.groups && node.groups.length){

            chest.openNotification("برای حذف این دسته، ابتدا باید دسته های زیرمجموعه آن پاک شوند.", "alert");
            return;
        }

        let modal = 
        <AskDeleteCategoryModal
        data={node}
        parentNode={parent_node}
        onCancel={this.onDeleteChildCancel}
        onConfirm={this.onDeleteChildConfirm}/>

        chest.ModalLayout.setAndShowModal(3, modal);

    }

    onDeleteChildCancel=()=>{

        chest.ModalLayout.closeAndDelete(3);
    }

    onDeleteChildConfirm=(node, parent_node)=>{

        this.view.setState({loading:true});

        chest.ModalLayout.closeAndDelete(3);

        let level = node.level;
        let params = {
            id: node.id,
            level
        };

        this.model.deleteGroup(params, (err, data)=>{

            if(data.result_code===env.SC.SUCCESS){

                let level = node.level;
                let v = this.view;
                let list = _.cloneDeep(v.state.list);
                if(level===1){
                    list.forEach((l1, i1)=>{
                        if(l1.id === node.id){
                            list.splice(i1, 1);
                        }
                    });
                }else if(level===2){
                    list.forEach((l1)=>{
                        l1.groups.forEach((l2, i2)=>{
                            if(l2.id === node.id){
                                l1.groups.splice(i2, 1);
                            }
                        });
                    });
                }else if(level===3){
                    list.forEach((l1)=>{
                        l1.groups.forEach((l2)=>{
                            l2.groups.forEach((l3, i3)=>{
                                if(l3.id === node.id){
                                    l2.groups.splice(i3, 1);
                                }
                            });
                        });
                    });
                }
                
                console.log("deleteChild", list);
                v.setState({list, old_list:list}, ()=>{
        
                    chest.openNotification("دسته مورد نظر حذف شد.", "success");

                    this.view.setState({loading:false});
        
                });

            }else{

                this.view.setState({loading:false});
            }
        });
    }

    cancelChild(node, level){

        let v = this.view;
        let list = _.cloneDeep(v.state.list);
        if(node.mode == "add"){
            if(level===1){
                list.forEach((l1, i1)=>{
                    if(l1.id === "input"){
                        list.splice(i1, 1);
                    }
                });
            }else if(level===2){
                list.forEach((l1)=>{
                    l1.groups.forEach((l2, i2)=>{
                        if(l2.id === "input"){
                            l1.groups.splice(i2, 1);
                        }
                    });
                });
            }else if(level===3){
                list.forEach((l1)=>{
                    l1.groups.forEach((l2)=>{
                        l2.groups.forEach((l3, i3)=>{
                            if(l3.id === "input"){
                                l2.groups.splice(i3, 1);
                            }
                        });
                    });
                });
            }
        }
        console.log("cancelChild", list);
        v.setState({list});
    }
}
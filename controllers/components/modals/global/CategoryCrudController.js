import CategoryCrudModel from "@/models/components/modals/global/CategoryCrudModel";
import chest from "@/utils/chest";
import Storage from "@/utils/storage";
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

    onExpand(expandedKeys, {expanded: bool, node}){

        let v = this.view;
        v.setState({expandedKeys});
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

        let node_key;

        if(!node){
            newList.push(newNode);
        }else if(level == 1){
            node_key = `${node.id}`;
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
                        node_key = `${l1.id}-${l2.id}`;
                        if(!l2.groups){l2.groups=[]}
                        l2.groups.push(newNode);
                    }
                });
            });
        }

        if(node_key && v.state.expandedKeys.indexOf(node_key) == -1){

            let newExpandedKeys = Object.assign([], v.state.expandedKeys);
            newExpandedKeys.push(node_key);

            v.setState({list: newList, expandedKeys: newExpandedKeys}, ()=>{
                clearInterval(this.editSetValueInterval);
                this.editSetValueInterval = setInterval(()=>{
                    if(v.editingNode){
                        v.editingNode.focus();
                        clearInterval(this.editSetValueInterval);
                    }
                }, 1000);
            });

        }else{
            v.setState({list: newList}, ()=>{
                clearInterval(this.editSetValueInterval);
                this.editSetValueInterval = setInterval(()=>{
                    if(v.editingNode){
                        v.editingNode.focus();
                        clearInterval(this.editSetValueInterval);
                    }
                }, 20);
            });
        }
    }

    submitAddChild(node, level, parent_node){

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

                Storage.remove("categories");

                let id = (data.data.g1_id | data.data.g2 | data.data.g3);
                let newNode = {id, title, level}

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

    cancelAddChild(node, level){

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

    editChild(node, level, parent_node){

        let v = this.view;

        let newList = _.cloneDeep(v.state.old_list);

        if(level == 1){
            newList.forEach((l1, i1)=>{
                if(l1.id===node.id){
                    l1.mode="edit";
                }
            });
        }else if(level == 2){
            newList.forEach((l1)=>{
                l1.groups.forEach((l2)=>{
                    if(l2.id===node.id){
                        l2.mode="edit";
                    }
                });
            });
        }else if(level == 3){
            newList.forEach((l1)=>{
                l1.groups.forEach((l2)=>{
                    l2.groups.forEach((l3)=>{
                        if(l3.id===node.id){
                            l3.mode="edit";
                        }
                    });
                });
            });
        }

        v.setState({list: newList}, ()=>{
            clearInterval(this.editSetValueInterval);
            this.editSetValueInterval = setInterval(()=>{
                if(v.editingNode){
                    //set node title input if avalible
                    v.editingNode.value = node.title;
                    v.editingNode.focus();
                    clearInterval(this.editSetValueInterval);
                }
            }, 20);
        });
    }

    submitEditChild(node, level, parent_node){
        
        let title = this.view.editingNode.value;
        if(!persianWithNum(title)){
            chest.openNotification("عنوان وارد شده معتبر نیست", "error");
            return;
        }

        this.view.setState({loading:true});

        let mlevel = node.level;
        let params = {
            id: node.id,
            level: mlevel,
            title,
        };

        this.model.editGroup(params, (err, data)=>{

            if(data.result_code===env.SC.SUCCESS){

                Storage.remove("categories");

                let level = node.level;
                let v = this.view;
                let list = _.cloneDeep(v.state.list);
                if(level===1){
                    list.forEach((l1, i1)=>{
                        if(l1.id === node.id){
                            l1.title = title;
                            l1.mode=undefined;
                        }
                    });
                }else if(level===2){
                    list.forEach((l1)=>{
                        l1.groups.forEach((l2, i2)=>{
                            if(l2.id === node.id){
                                l2.title = title;
                                l2.mode=undefined;
                            }
                        });
                    });
                }else if(level===3){
                    list.forEach((l1)=>{
                        l1.groups.forEach((l2)=>{
                            l2.groups.forEach((l3, i3)=>{
                                if(l3.id === node.id){
                                    l3.title = title;
                                    l3.mode=undefined;
                                }
                            });
                        });
                    });
                }
                
                v.setState({list, old_list:list}, ()=>{
        
                    chest.openNotification("دسته مورد نظر ویرایش شد.", "success");

                    this.view.setState({loading:false});
        
                });

            }else if(data.result_code === env.SC.RELATED_ENTITIES){

                chest.openNotification("این دسته بندی در دوره های دیگر استفاده شده و قابل حذف نمی باشد.", "error", {duration:8});
                chest.openNotification("برای حذف این دسته بندی ابتدا دسته بندی دوره هایی که این دسته بندی را دارند تغییر دهید.", "alert", {duration:12});

                this.view.setState({loading:false});

            }else{

                this.view.setState({loading:false});
            }
            
        });
    }

    cancelEditChild(node, level, parent_node){
        
        let v = this.view;

        let newList = _.cloneDeep(v.state.old_list);

        if(level == 1){
            newList.forEach((l1, i1)=>{
                if(l1.id===node.id){
                    l1.mode=undefined;
                }
            });
        }else if(level == 2){
            newList.forEach((l1)=>{
                l1.groups.forEach((l2)=>{
                    if(l2.id===node.id){
                        l2.mode=undefined;
                    }
                });
            });
        }else if(level == 3){
            newList.forEach((l1)=>{
                l1.groups.forEach((l2)=>{
                    l2.groups.forEach((l3)=>{
                        if(l3.id===node.id){
                            l3.mode=undefined;
                        }
                    });
                });
            });
        }

        v.setState({list: newList});
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

                Storage.remove("categories");

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

            }else if(data.result_code === env.SC.RELATED_ENTITIES){

                chest.openNotification("این دسته بندی در دوره های دیگر استفاده شده و قابل حذف نمی باشد.", "error", {duration:8});
                chest.openNotification("برای حذف این دسته بندی ابتدا دسته بندی دوره هایی که این دسته بندی را دارند تغییر دهید.", "alert", {duration:12});

                this.view.setState({loading:false});

            }else{

                this.view.setState({loading:false});
            }
            
        });
    }
}
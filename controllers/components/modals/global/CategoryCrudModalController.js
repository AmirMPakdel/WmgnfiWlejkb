import CategoryCrudModel from "@/models/components/modals/global/CategoryCrudModel";
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
                });

            }
        })
    }

    addChild(node, level){

        let v = this.view;

        if(v.lastChildInAction){
            this.cancelChild(v.lastChildInActionNode, v.lastChildInActionLevel);
        }

        v.lastChildInActionNode = node;
        v.lastChildInActionLevel = level;

        let newList = _.cloneDeep(v.state.list);

        if(!node){
            newList.push({
                title:"",
                mode:"add",
                id:"input",
            });
        }else if(level == 1){
            newList.forEach((l1, i1)=>{
                if(l1.id===node.id){
                    l1.groups.push({
                        title:"",
                        mode:"add",
                        id:"input",
                    });
                }
            });
        }
        
        v.setState({list: newList});
    }

    cancelChild(node, level, cb){

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
                                list.splice(i3, 1);
                            }
                        });
                    });
                });
            }
        }
        console.log(list);
        v.setState({list});
    }
}

/*
if(level===1){
    list.forEach((l1)=>{
        if(l1.id !== "input"){
            newList.push(l1);
        }
    });
}else if(level===2){
    list.forEach((l1)=>{
        l1.groups.forEach((l2)=>{
            if(l2.id !== "input"){
                newList.push(l2);
            }
        });
    });
}else if(level===3){
    list.forEach((l1)=>{
        l1.groups.forEach((l2)=>{
            l2.groups.forEach((l3)=>{
                if(l3.id !== "input"){
                    newList.push(l3);
                }
            });
        });
    });
}
*/
import React, { Component } from "react";
import { Tree } from 'antd';
import CrossSvg from "@/views/svgs/Cross";
import styles from "./CategoryCrudModal.module.css";
import MainButton from "../../global/MainButton";
import CategoryCrudController from "@/controllers/components/modals/global/CategoryCrudController";
import Loading from "../../global/Loading";
import chest from "@/utils/chest";

/**
* Props of CategoryCrudModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {function} onConfirm
* @property {function} onCancel
* 
* @extends {Component<Props>}
*/
export default class CategoryCrudModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new CategoryCrudController(this);
        this.state = {
            loading:true,
            list:[],
        }
    }
    
    componentDidMount(){

        this.controller.loadCategories();
    }

    onCancel=()=>{

        if(this.props.onCancel){
            this.props.onCancel();
        }else{
            chest.ModalLayout.closeAndDelete(1);
        }
    }

    onConfirm = ()=>{

        if(this.props.onConfirm){
            this.props.onConfirm();
        }else{
            chest.ModalLayout.closeAndDelete(1);
        }
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }

    addChild=(node, level)=>{
        this.controller.addChild(node, level);
    }

    editChild=(node, level)=>{
        //alert(node.id)
    }

    deleteChild=(node, level, parent_node)=>{
        this.controller.deleteChild(node, level, parent_node);
    }

    submitChild=(node, level, parent_node)=>{
        this.controller.submitChild(node, level, parent_node);
    }

    cancelChild=(node, level)=>{
        this.controller.cancelChild(node, level);
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.wrapper}>

                
                    <div className={styles.title+" tilt "}>{"ویرایش دسته بندی ها"}</div>

                    <div className={styles.form_body}>
                        
                        <MainButton className={styles.addLevel1}
                        title={"ایجاد دسته سطح یک"}
                        loading={this.state.btn_loading}
                        onClick={()=>this.addChild()}/>

                        <Tree
                        checkable={false}
                        showLine={true}
                        // defaultExpandedKeys={['0-0-0', '0-0-1']}
                        // defaultSelectedKeys={['0-0-0', '0-0-1']}
                        // defaultCheckedKeys={['0-0-0', '0-0-1']}
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        treeData={

                            this.state.list.map((l1, i1)=>{

                                if(l1.mode == "add" || l1.mode == "edit"){
                                    return {
                                        title: 
                                        (<div className={styles.parent_node}>

                                            <input className={styles.node_input+" btc2"}
                                            ref={r=>this.editingNode=r}/>
    
                                            <div className={styles.parent_node_operation}>
    
                                                <a className={styles.parent_node_add+" amp_btn fsc"}
                                                onClick={()=>this.submitChild(l1, 1)}>{"ثبت"}</a>
    
                                                <a className={styles.parent_node_add+" amp_btn fec"}
                                                onClick={()=>this.cancelChild(l1, 1)}>{"انصراف"}</a>
                                                
                                            </div>
    
                                        </div>),
    
                                        key:`${l1.id}`,
                                    }
                                }

                                return {
                                    title: 
                                    (<div className={styles.parent_node}>
                                        
                                        {l1.title}
                                        
                                        <div className={styles.parent_node_operation}>
                        
                                            <a className={styles.parent_node_add+" amp_btn fsc"}
                                            onClick={()=>this.addChild(l1, 1)}>{"اضافه"}</a>
                        
                                            <a className={styles.parent_node_add+" amp_btn ftc2"}
                                            onClick={()=>this.editChild(l1, 1)}>{"ویرایش"}</a>
                        
                                            <a className={styles.parent_node_add+" amp_btn fec"}
                                            onClick={()=>this.deleteChild(l1, 1)}>{"حذف"}</a>
                                            
                                        </div>
                        
                                    </div>),
                        
                                    key:`${l1.id}`,
                        
                                    children:
                                        l1.groups && l1.groups.length? l1.groups.map((l2,i2)=>{

                                            if(l2.mode == "add" || l2.mode == "edit"){
                                                return {
                                                    title: 
                                                    (<div className={styles.parent_node}>
            
                                                        <input className={styles.node_input+" btc2"}
                                                        ref={r=>this.editingNode=r}/>
                
                                                        <div className={styles.parent_node_operation}>
                
                                                            <a className={styles.parent_node_add+" amp_btn fsc"}
                                                            onClick={()=>this.submitChild(l2, 2, l1)}>{"ثبت"}</a>
                
                                                            <a className={styles.parent_node_add+" amp_btn fec"}
                                                            onClick={()=>this.cancelChild(l2, 2)}>{"انصراف"}</a>
                                                            
                                                        </div>
                
                                                    </div>),
                
                                                    key:`${l1.id}-${l2.id}`,
                                                }
                                            }
                        
                                            return {
                                                title: 
                                                (<div className={styles.parent_node}>
                        
                                                    {l2.title}
                        
                                                    <div className={styles.parent_node_operation}>
                        
                                                        <a className={styles.parent_node_add+" amp_btn fsc"}
                                                        onClick={()=>this.addChild(l2, 2)}>{"اضافه"}</a>
                        
                                                        <a className={styles.parent_node_add+" amp_btn ftc2"}
                                                        onClick={()=>this.editChild(l2, 2)}>{"ویرایش"}</a>
                        
                                                        <a className={styles.parent_node_add+" amp_btn fec"}
                                                        onClick={()=>this.deleteChild(l2, 2)}>{"حذف"}</a>
                                                        
                                                    </div>
                                                    
                                                </div>),
                        
                                                key:`${l1.id}-${l2.id}`,

                                                children:
                                                    l2.groups && l2.groups.length? l2.groups.map((l3,i3)=>{
                        
                                                        if(l3.mode == "add" || l3.mode == "edit"){
                                                            return {
                                                                title: 
                                                                (<div className={styles.parent_node}>
                        
                                                                    <input className={styles.node_input+" btc2"}
                                                                    ref={r=>this.editingNode=r}/>
                            
                                                                    <div className={styles.parent_node_operation}>
                            
                                                                        <a className={styles.parent_node_add+" amp_btn fsc"}
                                                                        onClick={()=>this.submitChild(l3, 3, l2)}>{"ثبت"}</a>

                                                                        <a className={styles.parent_node_add+" amp_btn fec"}
                                                                        onClick={()=>this.cancelChild(l3, 3)}>{"انصراف"}</a>
                                                                        
                                                                    </div>
                            
                                                                </div>),
                            
                                                                key:`${l1.id}-${l2.id}-${l3.id}`,
                                                            }
                                                        }
                        
                                                        return {
                                                            title: 
                                                            (<div className={styles.parent_node}>
                        
                                                                {l3.title}
                        
                                                                <div className={styles.parent_node_operation}>
                        
                                                                    <a className={styles.parent_node_add+" amp_btn ftc2"}
                                                                    onClick={()=>this.editChild(l3, 3)}>{"ویرایش"}</a>
                        
                                                                    <a className={styles.parent_node_add+" amp_btn fec"}
                                                                    onClick={()=>this.deleteChild(l3, 3, l2)}>{"حذف"}</a>
                                                                    
                                                                </div>
                        
                                                            </div>),
                        
                                                            key:`${l1.id}-${l2.id}-${l3.id}`,
                                                        }
                                                    }):
                                                    undefined
                                            }
                                        }):
                                        undefined
                                }
                            })
                        }/>

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ثبت"}
                        loading={this.state.btn_loading}
                        onClick={this.onConfirm}/>

                    </div>

                    {
                        this.state.loading?
                        <Loading className={styles.loading+" bglc1"}/>:null
                    }

                </div>

            </div>
        )
    }
}

const addChild = (data, addChild, submitAction, cancelAction)=>{

    return 
}
import CategorySelectController from "@/controllers/components/modals/global/CategorySelectController";
import React, { Component } from "react";
import styles from "./CategorySelectModal.module.css";
import CrossSvg from "@/views/svgs/Cross";
import MainButton from "@/views/components/global/MainButton";
import Loading from "@/views/components/global/Loading";
import chest from "@/utils/chest";
import { Tree } from "node_modules/antd/lib/index";

/**
* Props of CategorySelectModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {boolean} multiSelect
* @property {string} className
* @property {string} className
* @property {string} className
* @property {string} className
* @property {string} className
* 
* @extends {Component<Props>}
*/
export default class CategorySelectModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new CategorySelectController(this);
        this.state = {
            loading:true,
            list:[],
            checkedKeys: this.props.defaultCheckedKeys || [],
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

        this.props.onConfirm(this.state.checkedKeys);
    }
    
    onCheck = (checkedKeys, info) => {

        console.log('onCheck', checkedKeys, info);

        let cheKeys = [];
        let oldCheckedKeys = this.state.checkedKeys;

        if(!this.props.multiSelect){

            cheKeys = singleSelectCheckedKeys(checkedKeys, oldCheckedKeys);
        }

        this.setState({checkedKeys: cheKeys}, ()=>{

            if(this.props.onSelect){
                
                this.props.onSelect(cheKeys, info);
            }
        });
    }
    
    render(){
        return(
            <div className={styles.con+" bgw btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.wrapper}>

                
                    <div className={styles.title+" tilt "}>{"انتخاب دسته بندی ها"}</div>

                    <div className={styles.form_body}>
                        
                        {/* <MainButton className={styles.addLevel1}
                        title={"ایجاد دسته سطح یک"}
                        loading={this.state.btn_loading}
                        onClick={()=>this.addChild()}/> */}

                        <Tree
                        checkable={true}
                        showLine={true}
                        showIcon={false}
                        showLeafIcon={false}
                        checkedKeys={this.state.checkedKeys}
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
                        title={"تایید"}
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

const singleSelectCheckedKeys = (keys, oldKeys)=>{

    let keyArr = [];

    if(!keys.length){
        return [];
    }

    console.log("oldKeys",oldKeys);
    console.log("keys",keys);

    //TODO: fix some issues

    keyArr = keys.filter(x => !oldKeys.includes(x));

    console.log("keyArr", keyArr);

    return keyArr;
}
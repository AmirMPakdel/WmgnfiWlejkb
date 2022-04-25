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
* @property {(checkedKeys, checkedTitles)=>{}} onConfirm
* @property {function} onCancel
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

    onConfirm=()=>{

        if(this.props.onConfirm){
            this.props.onConfirm(this.state.checkedKeys, this.state.checkedTitles);
        }else{
            chest.ModalLayout.closeAndDelete(1);
        }
    }
    
    onCheck=(checkedKeys, info)=>{

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

    onCrud=()=>{

        this.controller.onCrud();
    }

    getList=()=>{

        return this.state.list;
    }
    
    render(){
        return(
            <div className={styles.con+" bgw btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.wrapper}>

                
                    <div className={styles.title+" tilt "}>{"انتخاب دسته بندی"}</div>

                    <MainButton className={styles.crud_btn}
                    title={"ویرایش"}
                    onClick={this.onCrud}/>

                    <div className={styles.form_body}>
                        
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

                                return {
                                    title: 
                                    (<div className={styles.parent_node}>
                                        
                                        {l1.title}
                        
                                    </div>),
                        
                                    key:`${l1.id}`,
                        
                                    children:
                                        l1.groups && l1.groups.length? l1.groups.map((l2,i2)=>{

                                            
                                            return {
                                                title: 
                                                (<div className={styles.parent_node}>
                        
                                                    {l2.title}
                                                    
                                                </div>),
                        
                                                key:`${l1.id}-${l2.id}`,

                                                children:
                                                    l2.groups && l2.groups.length? l2.groups.map((l3,i3)=>{
                        
                                                        return {
                                                            title: 
                                                            (<div className={styles.parent_node}>
                        
                                                                {l3.title}
                        
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
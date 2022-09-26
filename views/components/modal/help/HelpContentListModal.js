import chest from "@/utils/chest";
import React, { Component } from "react";
import styles from "./HelpContentListModal.module.css";
import CrossSvg from "@/views/svgs/Cross";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of HelpContentListModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class HelpContentListModal extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new HelpContentListModalController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    onClose=()=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onTreeSelect=(v, v2)=>{


        chest.ModalLayout.closeAndDelete(1);
    }
    
    render(){
        return(
            <CloseModalLayout className={styles.con+" bgw xl_card_shd"}
            wrapperClass={styles.wrapper}
            onClose={this.onClose}>

                <div className={styles.right_heading_tree_con+" sm_card_shd"}>

                    {
                        env.HELP_CONTNET.map((v,i)=>{
                            
                            return <>
                            <div className={styles.tree_title} key={i}
                            onClick={()=>this.onTreeSelect(v)}>{v.title}</div>
                            {
                                v.sub.map((v2,i2)=>(
                                    <div className={styles.tree_sub+" "+((i==0&&i2==0)?styles.selected_tree_itme:"")} key={i2}
                                    onClick={()=>this.onTreeSelect(v, v2)}>{v2.title}</div>
                                ))
                            }
                            </>
                        })
                    }
                </div>
                
            </CloseModalLayout>
        )
    }
}
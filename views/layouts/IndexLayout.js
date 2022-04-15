import React, { Component } from "react";
import AccessLayout from "@/views/layouts/AccessLayout";
import IndexHeader from "@/views/components/layouts/IndexHeader";
import styles from "./IndexLayout.module.css";
import ModalLayout from "@/views/layouts/ModalLayout";
import IndextFooter from "@/views/components/layouts/IndexFooter";

/**
 * @typedef Props 
 * @property {"noAuth"|"student"|"userL1"|"userL2"} accessType
 * @property {boolean} showWithoutAuth
 * 
 * @extends {Component<Props>}
 */
export default class IndexLayout extends Component {
    
    render(){
        return(
            <ModalLayout>
                <AccessLayout 
                accessType={this.props.accessType}
                showWithoutAuth={this.props.showWithoutAuth}>
               
                    <div className={styles.con+" bglc2i"}>

                        <IndexHeader/>

                        {this.props.children}

                        <IndextFooter/>

                    </div>
                
                </AccessLayout>
            </ModalLayout>
        )
    }
}
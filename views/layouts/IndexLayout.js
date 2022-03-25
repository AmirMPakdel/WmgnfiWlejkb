import React, { Component } from "react";
import AccessLayout from "@/views/layouts/AccessLayout";
import IndexHeader from "@/views/layouts/IndexHeader";
import styles from "./IndexLayout.module.css";
import ModalLayout from "@/views/layouts/ModalLayout";
import IndextFooter from "@/views/components/layouts/IndexFooter";

/**
 * @typedef Props 
 * @property {AccessLevel} accessLevel
 * 
 * @extends {Component<Props>}
 */
export default class IndexLayout extends Component {
    
    render(){
        return(
            <AccessLayout accessLevel={this.props.accessLevel}>
                <ModalLayout>
                    <div className={styles.con+" bglc2i"}>

                        <IndexHeader/>

                        {this.props.children}

                        <IndextFooter/>

                    </div>
                </ModalLayout>
            </AccessLayout>
        )
    }
}
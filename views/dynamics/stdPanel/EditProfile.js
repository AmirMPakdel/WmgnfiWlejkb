import StudentPanelLayout from "@/views/layouts/StudentPanelLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import React, { Component } from "react";
import styles from "./EditProfile.module.css";

/**
* Props of EditProfile Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditProfile extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new EditProfileController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <StudentPanelLayout accessType="student"
            showWithoutAuth={false}>

                <WrapperT1>

                    <div className={styles.con}>
                    
                    </div>

                </WrapperT1>

            </StudentPanelLayout>
        )
    }
}
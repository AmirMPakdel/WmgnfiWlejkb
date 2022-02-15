import React, { Component } from "react";
import AccessLayout from "./AccessLayout";
import IndexHeader from "./IndexHeader";
import ModalLayout from "./ModalLayout";
import styles from "./StudentPanelLayout.module.css";

/**
* Props of StudentPanelLayout Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class StudentPanelLayout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <AccessLayout accessLevel={this.props.accessLevel}>
                <ModalLayout>
                    
                    <div className={styles.layout}>

                        <IndexHeader/>

                        <div className={styles.upper_sec}>

                        </div>
                        
                        <div className={styles.wrapper}>
                            {this.props.children}
                        </div>

                        <div className={styles.mock_footer}>FOOTER</div>

                    </div>
                </ModalLayout>
            </AccessLayout>
        )
    }
}
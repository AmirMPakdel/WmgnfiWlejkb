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

                            <div className={styles.tab_btn_wrapper}>

                                <TabBtn title={"دوره های من"}
                                href={env.PATHS.STUDENT_COURSES}/>

                                <TabBtn title={"علاقه مندی ها"}
                                href={env.PATHS.STUDENT_WISHLIST}/>

                                <TabBtn title={"فاکتور ها"}
                                href={env.PATHS.STUDENT_RECIEPTS}/>

                                <TabBtn title={"ویرایش پروفایل"}
                                href={env.PATHS.STUDENT_EDIT_PROFILE}/>

                            </div>

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

function TabBtn(props){

    let add_class="";
    if(window.location.href.search(props.href) != -1){
        add_class=styles.tab_btn_border_selected;
    }
    return(
        <a className={styles.tab_btn+" flc1"}
        href={props.href}>
            {
                props.title
            }
            <div className={styles.tab_btn_border+" bgw "+add_class}/>
        </a>
    )
}
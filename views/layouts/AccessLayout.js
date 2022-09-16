import React, { Component } from "react";
import AccessLayoutController from "@/controllers/layouts/AccessLayoutController";
import "@/models/jsdoc/AccessLevel";
import Loading from "@/views/components/global/Loading";
import styles from "./AccessLayout.module.css";

/**
 * @typedef Props 
 * @property {"noAuth"|"student"|"userL1"|"userL2"} accessType
 * @property {boolean} showWithoutAuth
 * 
 * @extends {Component<Props>}
 */
export default class AccessLayout extends Component {

    constructor(props){
        super(props);

        this.controller = new AccessLayoutController(this);

        this.state = {
            loading: props.accessType=="noAuth"?false:true,
            authenticated: false,
        }
    }

    componentDidMount(){

        if(this.props.accessType === "student"){
            this.controller.loadStudent();
        }else if(this.props.accessType === "userL1" || 
            this.props.accessType === "userL2"){
            this.controller.loadUser();
        }
    }
    
    render(){
        return(
            <div className={styles.layout+" bglc1i "}>

                {
                    this.state.loading?
                    <Loading style={{minHeight:"90vh"}}/>:
                    <>
                    {
                        (this.state.authenticated || this.props.showWithoutAuth || 
                        this.props.accessType==="noAuth")?

                        this.props.children:
                        null
                    }
                    </>
                }
                
            </div>
        )
    }
}
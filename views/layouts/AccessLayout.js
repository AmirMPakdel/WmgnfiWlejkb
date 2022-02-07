import React, { Component } from "react";
import AccessLayoutController from "@/controllers/layouts/AccessLayoutController";
import "@/models/jsdoc/AccessLevel";
import Loading from "@/views/components/global/Loading";
import styles from "./AccessLayout.module.css";

/**
 * @typedef Props 
 * @property {AccessLevel} accessLevel
 * 
 * @extends {Component<Props>}
 */
export default class AccessLayout extends Component {

    constructor(props){
        super(props);

        this.controller = new AccessLayoutController(this);

        this.state = {
            loading: true,
            userAccessLevel: {
                "1":false,
                "2":false,
                "3":false,
                "4":false,
            }
        }
    }

    componentDidMount(){

        this.controller.loadUser();
    }
    
    render(){
        return(
            <div className={styles.layout+" bglc2i "}>

                {/* {
                    this.props.accessLevel === "1" || !this.props.accessLevel?
                    this.props.children:null
                } */}

                {
                    this.state.loading?
                    <Loading style={{minHeight:"90vh"}}/>:
                    <>
                    {
                        this.props.children
                    }

                        {/* {
                            this.props.accessLevel === "2" && !this.state.userAccessLevel["2"]?
                            <h1>You need accessLevel 2 for accessing this page</h1>
                            :null
                        }
                        {
                            this.props.accessLevel === "2" && this.state.userAccessLevel["2"]?
                            this.props.children
                            :null
                        }

                        {
                            this.props.accessLevel === "3" && this.state.userAccessLevel["3"]?
                            this.props.children
                            :null
                        }
                        {
                            this.props.accessLevel === "3" && !this.state.userAccessLevel["3"]?
                            <h1>You need accessLevel 3 for accessing this page</h1>
                            :null
                        }

                        {
                            this.props.accessLevel === "4" && this.state.userAccessLevel["4"]?
                            this.props.children
                            :null
                        }
                        {
                            this.props.accessLevel === "4" && !this.state.userAccessLevel["4"]?
                            <h1>You need accessLevel 4 for accessing this page</h1>
                            :null
                        } */}

                    </>
                }

            </div>
        )
    }
}
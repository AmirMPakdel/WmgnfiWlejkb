import React, { Component } from "react";
import styles from "./MinfoHeader.module.css";
import IconButton from "../global/IconButton";

/**
* Props of MinfoHeader Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoHeader extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoHeaderController(this);
        this.state = {
        
        }

        this.links=[
            {
                label:"مینفو",
                href:"#minfo",
            },
            {
                label:"ویژگی ها",
                href:"#features",
            },
            {
                label:"تعرفه ها",
                href:"#pricing",
            }
        ]
    }
    
    componentDidMount(){

        this.addShadow();
    }

    addShadow=()=>{

        this.con.style.boxShadow = "2px 4px 12px -2px rgba(0, 0, 0, 0.25)";
    }

    removeShadow=()=>{

        this.con.style.boxShadow = "unset";
    }
    
    render(){
        return(
            <div className={styles.con}
            ref={r=>this.con=r}>

                <div className={styles.right_side}>

                    <img className={styles.logo}
                    src={"/statics/svg/minfo-logo-main.svg"}/>

                    {
                        this.links.map((v,i)=>(
                            <a key={i} 
                            className={styles.links+" bdyti"} 
                            href={v.href}>
                                {v.label}
                            </a>
                        ))
                    }

                </div>

                <div className={styles.left_side}>

                    <IconButton className={styles.login_btn}
                    title="ورود"
                    icon={"/statics/svg/user-white.svg"}
                    iconClassName={styles.login_icon}/>

                    <IconButton className={styles.signup_btn}
                    title="ثبت نام"
                    icon={"/statics/svg/signup-black.svg"}
                    iconClassName={styles.login_icon}/>

                </div>
                
            </div>
        )
    }
}
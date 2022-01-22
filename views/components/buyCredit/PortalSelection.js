import React, { Component } from "react";
import styles from "./PortalSelection.module.css";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";
import { Radio } from "node_modules/antd/lib/index";
import MainButton from "../global/MainButton";

/**
* Props of PortalSelection Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {BuyCredit} parent
* 
* @extends {Component<Props>}
*/
export default class PortalSelection extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    scrollInto=()=>{

        this.anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }

    onPortal=(id)=>{
        let p = this.props.parent;
        p.setState({selected_portal:id});
    }
    
    render(){

        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bgw"} ref={r=>this.con=r}>

                <div ref={r=>this.anchor=r} style={{position:"absolute",top:"-6rem"}}/>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"انتخاب درگاه پرداخت"}</div>

                {
                    ps.portals.map((v,i)=>(

                        <div key={i} className={styles.item_con+" amp_btn "+ ((ps.selected_portal==v.id)?"btc2 ":"blc2 ")}
                        onClick={()=>this.onPortal(v.id)}>

                            <img className={styles.item_icon} src={v.icon}/>
                            
                            <div className={styles.item_text+" cpnt"}>{v.title}</div>

                            <Radio checked={ps.selected_portal==v.id}/>

                        </div>
                    ))
                }
                
            </div>
        )
    }
}
import React, { Component } from "react";
import styles from "./SortableElement.module.css";

/**
* Props of SortableElement Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SortableElement extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new SortableElementController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        let d = this.props.data;
        let con_style = styles.con+" bgw";
        let sort_icon = "/statics/svg2/vegiburger.svg";

        let control_sec = styles.control_sec;
        if(d.type==1 || d.type==2){
            con_style = styles.con+" bglc2";
            sort_icon = "/statics/svg2/lock.svg";
            control_sec = styles.control_sec2;
        }

        return(
            <div className={con_style}>

                <div className={styles.sort_sec+" dragHandleSelector"}>

                    <img className={styles.sort_icon}
                    src={sort_icon}/>

                </div>

                <div className={styles.wrapper1}>

                    <div className={styles.name_sec+" tilt bgtc1"}>
                        {
                            type2Name(d.type)
                        }
                    </div>

                    <div className={styles.title_sec+" bdyt"}>
                        {
                            d.title
                        }
                    </div>

                </div>

                <div className={control_sec}>

                </div>
                
            </div>
        )
    }
}

function type2Name(type){

    let text = "";
    type = type.toString();
    switch(type){

        case "1":
            text="شروع سایت";
            break;
        
        case "2":
            text="فوتر";
            break;
        
        case "3":
            text="لیست دوره ها";
            break;

        case "4":
            text="جعبه اطلاعاتی";
            break;
    }

    return text
}
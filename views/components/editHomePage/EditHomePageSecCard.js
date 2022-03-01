import Delete from "@/views/svgs/Delete";
import Setting from "@/views/svgs/Setting";
import VeggieBurger from "@/views/svgs/VeggieBurger";
import React, { Component } from "react";
import IconButton from "../global/IconButton";
import styles from "./EditHomePageSecCard.module.css";

/**
* Props of EditHomePageSecCard Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {"slider"|"info-box"|"image"|"video"|"list"|"footer"} type
* 
* @extends {Component<Props>}
*/
export default class EditHomePageSecCard extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new EditHomePageSecCardController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){

        let deletable = true;
        let pr = this.props;
        let d = this.props.data;

        let control_sec = styles.control_sec;
        if(d.type==1 || d.type==2){
            control_sec = styles.control_sec2;
        }

        return(
            <div className={styles.con+" bgw md_card_shd"}>

                <div className={styles.visible_sec}>

                {
                    d.visible?
                    <img className={styles.visiblity+" amp_btn"} 
                    src={"/statics/svg2/visible_icon.svg"}/>
                    :
                    <img className={styles.visiblity+" amp_btn"} 
                    src={"/statics/svg2/visible_not_icon.svg"}/>
                }

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

                <div className={control_sec+" bgtc1"}>

                    <img className={styles.edit_icon+" amp_btn"} 
                    src={"/statics/svg2/edit.svg"}
                    onClick={this.onEdit}/>

                    {
                        (d.type==1 || d.type==2)?
                        null:
                        <img className={styles.delete_icon+" amp_btn"} 
                        src={"/statics/svg2/delete.svg"}
                        onClick={this.onDelete}/>
                    }

                </div>

                {/* <div className={styles.right_sec}>
                    
                    <div className={styles.title_con}>
                        {
                            this.props.sortable?
                            <VeggieBurger className={styles.sort_handler}/>:null
                        }

                        <div className={styles.title+" tilt"}>
                            {this.props.title}
                        </div>

                        {
                            pr.visible?
                            <img className={styles.visiblity} src={"/statics/svg2/visible_icon.svg"}/>:
                            <img className={styles.visiblity} src={"/statics/svg2/visible_not_icon.svg"}/>
                        }
                        
                    </div>

                    <div className={styles.info_box}>
                        {
                            type2Info(this.props.type)
                        }
                    </div>

                    <div className={styles.controllers}>

                        <IconButton 
                        className={styles.icon_btn1}
                        iconClassName={styles.icon_btn_icon}
                        icon={Setting}
                        iconProps={{stroke:env.THEME.dc1}}/>

                        {
                            deletable?
                            <IconButton 
                            className={styles.icon_btn2+" bgec"}
                            iconClassName={styles.icon_btn_icon}
                            icon={Delete}
                            iconProps={{stroke:env.THEME.dc1}}/>:null
                        }

                    </div>

                </div>

                <div className={styles.left_sec}>

                    <img className={styles.icon} src={this.props.icon}/>

                </div> */}
                
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
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

        if(pr.type=="slider" || pr.type=="footer"){
            deletable = false;
        }

        return(
            <div className={styles.con+" bgw md_card_shd"}>

                <div className={styles.right_sec}>
                    
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

                </div>
                
            </div>
        )
    }
}

function type2Info(type){

    let text = "";

    switch(type){

        case "slider":
            text="نمایش عکس ها به صورت اسلایدر در ابتدای سایت";
            break;
        
        case "info-box":
            text="نمایش عنوان، متن و دکمه ارجاع به یک لینک درکنار یک عکس یا ویدیو";
            break;
        
        case "image":
            text="نمایش یک عکس بصورت بنر";
            break;

        case "video":
            text="نمایش یک ویدیو";
            break;

        case "list":
            text="نمایش لیست افقی دوره ها یا مقالات";
            break;

        case "footer":
            text="ویرایش اطلاعات فوتر سایت";
            break;
    }

    return <div className={" bdyt"}>{text}</div>
}
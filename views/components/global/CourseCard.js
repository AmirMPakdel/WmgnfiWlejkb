import myServer from "@/utils/myServer";
import React, { Component } from "react";
import styles from "./CourseCard.module.css";
import Price from "./Price";

/**
* Props of CourseCard Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {boolean} hideRating
* @property {boolean} directLogoUrl
* @property {boolean} disableLink
* 
* @extends {Component<Props>}
*/
export default class CourseCard extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new CourseCardController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){

        let d = this.props.data;

        let link_title = "";
        let link = "";
        if(!this.props.disableLink){
            link_title = d.title.split(" ").join("-");
            link = "/course/" + d.id + "/" + link_title;
        }

        let logo_url = "";
        if(this.props.directLogoUrl){
            logo_url = d.logo;
        }else{
            logo_url = myServer.MediaFiles.publicImage(d.logo);
        }
        

        return(
            <a href={this.props.disableLink?undefined:link} className={styles.con+" sm_card_shd "+this.props.className}>
                
                <div className={styles.card_image+" sm_card_shd"}
                style={{backgroundImage:`url("${logo_url}")`}}/>

                <div className={styles.row1}>

                    <img className={styles.educator_icon} src={"/statics/svg2/educator_gray.svg"}/>

                    <div className={styles.educator_name+" fdc1"}>{d.educators_name.join(" ,")}</div>

                </div>

                <div className={styles.title+" fdc2"}>{d.title}</div>

                <div className={styles.row2}>

                    <Price className={styles.price+" fdc1"} 
                    price={d.price}
                    withDiscount={d.discount_price}
                    />

                    {
                        this.props.hideRating?
                        null:
                        <div className={styles.rating_con+" fdc1"}>

                            <img className={styles.rating_icon} 
                            src={"/statics/svg/rating_fullstar_black.svg"}/>
                            {d.score}

                        </div>
                    }

                </div>
                
            </a>
        )
    }
}

export class HallowCourseCard extends Component{
    
    render(){
        return(<div className={styles.con+" "+this.props.className}
        style={{backgroundColor:"transparent"}}/>)
    }
}
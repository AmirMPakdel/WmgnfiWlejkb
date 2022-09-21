import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import CrossSvg from "@/views/svgs/Cross";
import styles from "./AddElementSelectModal.module.css";
import { Popover, Radio } from "node_modules/antd/lib/index";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of AddElementSelectModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {function} onCancel
* @property {function} onContinue
* 
* @extends {Component<Props>}
*/
export default class AddElementSelectModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selected_type: "3",
            guide_image_src:"/statics/img/guide_infobox.jpg",
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    onContinue=()=>{
        if(this.props.onContinue){
            this.props.onContinue(this.state.selected_type);
        }
    }

    onSelect=(type)=>{

        let guide_image_src = "";
        if(type == "3"){
            guide_image_src = "/statics/img/guide_infobox.jpg";
        }else if(type == "4"){
            guide_image_src = "/statics/img/guide_courselist.jpg";
        }

        this.setState({selected_type:type, guide_image_src});
    }
    
    render(){
        return(
            <CloseModalLayout className={styles.con+" bgw btc2 xl_card_shd"}
            onClose={this.onCancel}>

                <div className={styles.wrapper}>

                    <div className={styles.title+" tilt "}>{"آیتم مورد نظر خود را برای ایجاد انتخاب کنید."}</div>

                    <div className={styles.items_con}>

                        <TypeSelect
                        title={"جعبه اطلاعاتی"}
                        type={"3"}
                        helpSrc={"https://gamefa.com/wp-content/uploads/2022/03/robert-pattinson-the-batman-768x384.jpg.webp"}
                        checked={this.state.selected_type == "3"}
                        onClick={()=>this.onSelect("3")}/>

                        <TypeSelect
                        title={"لیست دوره‌ها"}
                        type={"4"}
                        helpSrc={"https://gamefa.com/wp-content/uploads/2022/03/robert-pattinson-the-batman-768x384.jpg.webp"}
                        checked={this.state.selected_type == "4"}
                        onClick={()=>this.onSelect("4")}/>

                    </div>

                    <img className={styles.guide_image+" sm_card_shd"} src={this.state.guide_image_src}/>

                    <MainButton className={styles.confirm_btn}
                    title={"ادامه"}
                    onClick={this.onContinue}/>
                    
                </div>
                
            </CloseModalLayout>
        )
    }
}

class TypeSelect extends Component{

    render(){
        return(
            <div className={styles.ts_con}>

                <Radio checked={this.props.checked}
                onClick={this.props.onClick}/>

                <div className={styles.ts_title+" bdyt"}>{this.props.title}</div>

                {/* <Popover overlayClassName={styles.ts_pop_overlay}
                content={<img className={styles.ts_pop_con} src={this.props.helpSrc}/>}>

                    <img className={styles.ts_help} src={"/statics/svg2/question.svg"}/>
                
                </Popover> */}

            </div>
        )
    }
}
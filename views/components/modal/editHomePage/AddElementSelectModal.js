import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import CrossSvg from "@/views/svgs/Cross";
import styles from "./AddElementSelectModal.module.css";
import { Popover, Radio } from "node_modules/antd/lib/index";

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
        //this.controller = new AddElementSelectModalController(this);
        this.state = {
            selected_type: null,
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
            this.props.onContinue();
        }
    }

    onSelect=(type)=>{

        this.setState({selected_type:type});
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

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

                    <MainButton className={styles.confirm_btn}
                    title={"ادامه"}
                    onClick={this.onContinue}/>
                    
                </div>
                
            </div>
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

                <Popover overlayClassName={styles.ts_pop_overlay}
                content={<img className={styles.ts_pop_con} src={this.props.helpSrc}/>}>

                    <img className={styles.ts_help} src={"/statics/svg2/question.svg"}/>
                
                </Popover>

            </div>
        )
    }
}
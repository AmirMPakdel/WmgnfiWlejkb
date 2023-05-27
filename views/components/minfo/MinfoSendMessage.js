import React, { Component } from "react";
import styles from "./MinfoSendMessage.module.css";
import MinfoSectionHeader from "./MinfoSectionHeader";
import TextInput from "../global/TextInput";
import TextArea from "../global/TextArea";
import IconButton from "../global/IconButton";

/**
* Props of MinfoSendMessage Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoSendMessage extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoSendMessageController(this);
        this.state = {
            title:"",
            email:"",
            message:"",
        }
    }
    
    componentDidMount(){
    }

    onTextInput=(v,name)=>{

        this.state[name] = v;
        this.setState(this.state);
    }
    
    render(){
        return(
            <div className={styles.con}>
                
                <div className={styles.wrapper}>

                    <MinfoSectionHeader title={"ارسال پیام"}
                    darkMode={true}/>

                    <div className={styles.sec}>

                        <div className={styles.wrapper2}>

                            <TextInput className={styles.title_ti}
                            inputClassName={styles.input_title_ti}
                            topTitleClassName={styles.topTitleClassName}
                            value={this.state.title}
                            title="موضوع"
                            placeholder="موضوع"
                            onChange={(v)=>this.onTextInput(v, "title")}/>

                            <TextInput className={styles.email_ti}
                            inputClassName={styles.input_title_ti}
                            title="پست الکترونیکی"
                            placeholder="پست الکترونیکی"
                            topTitleClassName={styles.topTitleClassName}
                            value={this.state.email}
                            onChange={(v)=>this.onTextInput(v, "email")}/>

                            <TextArea className={styles.message_ti}
                            inputClassName={styles.message_ti_input}
                            value={this.state.message}
                            placeholder="متن پیام"
                            title="متن پیام"
                            topTitleClassName={styles.topTitleClassName}
                            onChange={(v)=>this.onTextInput(v, "message")}/>

                            <div className={styles.row1}>

                                <IconButton className={styles.send_btn}
                                title="ارسال"
                                icon={"/statics/svg/minfo-send-white.svg"}/>

                            </div>

                        </div>

                        <img className={styles.left_image}
                        src={"/statics/svg/minfo-sendmessage-image.svg"}/>

                    </div>

                </div>
            </div>
        )
    }
}
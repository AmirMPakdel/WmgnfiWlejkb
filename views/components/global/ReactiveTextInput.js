import React, { Component } from "react";
import Loading from "./Loading";
import styles from "./ReactiveTextInput.module.css";
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

/**
* Props of ReactiveTextInput Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {React.CSSProperties} titleStyle
* @property {string} title
* @property {string} placeholder
* @property {"loading" | "error" | "success"} status 
* @property {number} maxLength
* 
* @extends {Component<Props>}
*/
export default class ReactiveTextInput extends Component {

    state={
        error:"",
    }
    
    onChange=(e)=>{

        if(!this.props.onChange) return;

        if(this.props.inputFilter){

            let {value , error} = 
            this.props.inputFilter(this.props.value, e.target.value);

            this.props.onChange(value);

            this.setState({error});

        }else{

            this.props.onChange(e.target.value);
        }
    }

    centerize=()=>{
        
        this.input.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }
    
    render(){

        let title = "";
        let title_st = {};
        let input_st = {};
        let add_class = "";
        let message_add_class = " ";

        if(this.props.className){
            add_class += this.props.className+" ";
        }

        if(this.props.direction){
            input_st.direction = this.props.direction;
        }

        if(!this.props.value && !this.props.static_title){
            title_st.opacity = 0;
            title = this.props.title;
        }

        if(this.props.status=="error"){
            add_class += " beci ";
            message_add_class += " feci ";
        }else if(this.props.status=="success"){
            add_class += " bsci ";
            message_add_class += " fsci ";
        }


        return(
            <div className={styles.tput_con+" "+add_class} style={this.props.style}>
                
                {
                    this.props.title?
                    <div className={styles.tput_title} style={{...title_st, ...this.props.titleStyle}}>{this.props.title}</div>:null
                }
                
                <input className={styles.tput_input+" bdyt "} 
                placeholder={this.props.placeholder} 
                value={this.props.value}
                onChange={this.onChange} 
                style={input_st}
                maxLength={this.props.maxLength}
                ref={r=>this.input=r}/>

                {
                    this.props.status==="loading"?
                    <Loading className={styles.loading_status} scale={0.3}/>:null
                }
                {
                    this.props.status==="success"?
                    <CheckCircleOutlined className={styles.success_status} style={{ color: env.THEME.sc }}/>:null
                    
                }
                {
                    this.props.status==="error"?
                    <ExclamationCircleOutlined className={styles.success_status} style={{ color: env.THEME.ec }}/>:null
                }
                {
                    this.props.message || this.state.error?
                    <div className={styles.message + message_add_class}>{this.props.message || this.state.error}</div>:null
                }

            </div>
        )
    }
}
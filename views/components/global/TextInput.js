import React, { Component } from "react";
import styles from "./TextInput.module.css";

/**
* Props of TextInput Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {React.CSSProperties} titleStyle
* @property {React.CSSProperties} inputStyle
* @property {(text:string)=>{}} onChange
* @property {string} value
* @property {string} title
* @property {string} placeholder
* @property {string | boolean} error
* @property {number} maxLength
* @property {function} inputFilter
* @property {"password"|"price"} type
* @property {string} autocomplete
* @property {boolean} disabled
* @property {function} OnEnterKeyPressed
* 
* @extends {Component<Props>}
*/
export default class TextInput extends Component {

    state={
        error:"",
    }

    componentDidMount(){

        this.input.addEventListener("keyup", this.onKeyUp)
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

    onKeyUp=(e)=>{

        if (e.keyCode === 13) {

            e.preventDefault();

            if(this.props.OnEnterKeyPressed){

                this.props.OnEnterKeyPressed();
            }
        }
    }
    
    render(){

        let title = "";
        let title_st = {};
        let input_st = {...this.props.inputStyle};
        let add_class = "";

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

        if(this.props.error){

            add_class += " beci ";
        }

        let m_input_type = "";
        if(this.props.type==="password"){
            m_input_type = "password";
        }

        return(
            <div className={styles.tput_con +" blc2 "+add_class} style={this.props.style}>
                
                {
                    this.props.title?
                    <div className={styles.tput_title} style={{...title_st, ...this.props.titleStyle}}>{this.props.title}</div>:null
                }
                
                <input className={styles.tput_input+" bdyt "} 
                placeholder={this.props.placeholder} 
                value={this.props.value}
                onChange={this.onChange} 
                style={input_st}
                disabled={this.props.disabled}
                maxLength={this.props.maxLength}
                type={m_input_type}
                autoComplete={this.props.autocomplete}
                ref={r=>this.input=r}/>

                {
                    this.props.error || this.state.error?
                    <div className={styles.error+" fec"}>{this.props.error || this.state.error}</div>:null
                }

            </div>
        )
    }
}
import { priceFormat, priceFormattoInteger } from "@/utils/price";
import React, { Component } from "react";
import styles from "./EditableText.module.css";

/**
* Props of EditableText Component
* @typedef Props
* @property {string} className
* @property {string} inpuClassName
* @property {React.CSSProperties} style
* @property {(text)=>{}} onChange
* @property {string} value
* @property {string} oldValue
* @property {number} maxLength
* @property {placeholder} placeholder
* @property {function} inputFilter
* @property {"password"|"price"} type
* 
* @extends {Component<Props>}
*/
export default class EditableText extends Component {
    
    state = {
        readOnly : true,
    }

    onEdit = ()=>{
        this.setState({readOnly : false},
            ()=>{
                // Mostly for Web Browsers
                // setting focus on intput and putting the text cursor at the end of the input
                let len = this.input.value.length;
                if (this.input.setSelectionRange) {
                    this.input.focus();
                    this.input.setSelectionRange(len, len);
                } else if (this.input.createTextRange) {
                    var t = this.input.createTextRange();
                    t.collapse(true);
                    t.moveEnd('character', len);
                    t.moveStart('character', len);
                    t.select();
                }
            });
    }

    onSubmit = ()=>{
        this.setState({readOnly : true});
    }

    onCancel = ()=>{
        this.input.value = this.props.oldValue;
        this.props.onChange(this.props.oldValue);
        this.setState({readOnly : true});
    }

    onChange = (e)=>{
        if(!this.props.onChange) return;

        let val = e.target.value;

        if(val == ""){
            this.props.onChange(val);
            return;
        }

        if(this.props.type == "price"){
            val = priceFormattoInteger(val);
            val = priceFormat(val);
        }

        if(this.props.inputFilter){

            let {value , error} = 
            this.props.inputFilter(this.props.value, val);

            this.props.onChange(value);

            this.setState({error});

        }else{

            this.props.onChange(val);
        }
    }

    render(){
        return(
            <div className={styles.con+" bgwi bdc2i "+this.props.className} style={this.props.style}>

                <input ref={r=>this.input=r} 
                className={styles.input+" "+this.props.inpuClassName} 
                value={this.props.value} 
                readOnly={this.state.readOnly} 
                maxLength={this.props.maxLength}
                placeholder={this.props.placeholder}
                onChange={this.onChange}/>

                {
                    this.props.error || this.state.error?
                    <div className={styles.error+" fec"}>{this.props.error || this.state.error}</div>:null
                }
                
            </div>
        )
    }
}
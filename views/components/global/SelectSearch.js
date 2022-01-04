import { Select } from "antd";
import React, { Component } from "react";
import styles from "./SelectSearch.module.css";


export default class SelectSearch extends Component {
    
    constructor(props){
        super(props);
    }

    
    onChange = (id)=>{
        if(this.props.value !== id){
            this.props.onChange(id, getById(this.props.options, id));
        }
    }

    filterOption = (input, option) =>{
        return (option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0)
    }

    clear = ()=>{
    }
    
    render(){
        let add_class = "";

        if(this.props.className){
            add_class+=this.props.className+" ";
        }

        return(
            <Select
                showSearch
                disabled={this.props.disabled}
                className={styles.con+" "+add_class}
                dropdownClassName={styles.dropdown}
                placeholder={this.props.placeholder}
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                value={this.props.value}
                filterOption={this.filterOption}>

                {
                    this.props.options && this.props.options.length? 
                    this.props.options.map((v,i)=>(
                        <Select.Option className={styles.option} key={i} value={v.id}>{v.title}</Select.Option>
                    )):null
                }

            </Select>
        )
    }
}

/**
 * @param {[id]} list 
 * @param {String} id 
 */
 function getById(list, id){

    let obj;
    list.map((v,i)=>{
        if(v.id===id){
            obj=v;
        }
    });
    return obj;
}
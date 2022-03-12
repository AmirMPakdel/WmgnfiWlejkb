import { Menu } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./Dropdown.module.css";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown as AntDropdown } from "node_modules/antd/lib/index";

/**
* Props of Dropdown Component
* @typedef Props
* @property {string} className
* @property {string} optionsClassName
* @property {string} placeholder
* @property {{id:number, title:string}} defaultSelected 
* @property {[{id:number, title:string}]} options
* @property {({id:number, title:string})=>{}} onSelect
* 
* @extends {Component<Props>}
*/
export default class Dropdown extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            seleted: null
        }
        if(props.defaultSelected){
            this.state.seleted = props.defaultSelected;
        }
        
    }
    
    componentDidMount(){
    }

    onSelect=(item)=>{
        this.setState({seleted:item}, ()=>{
            this.props.onSelect && this.props.onSelect(item);
        });
    }
    
    render(){

        const menu = 
        <Menu>
        {
            this.props.options?
            this.props.options.map((v,i)=>(
                <Menu.Item key={v.id} onClick={()=>this.onSelect(v)}>
                    <div className={styles.options+" bdyt "+this.props.optionsClassName}>{v.title}</div>
                </Menu.Item>
            )):
            null
        }
        </Menu>

        return(
            <div className={this.props.className}>

                <AntDropdown overlay={menu} trigger={['click']}>
                
                    <div className={styles.select_btn+" blc2 "} onClick={e => e.preventDefault()}>

                        {
                            this.state.seleted?
                            <div className={styles.top_title+" bglc1 fdc2 "}>{this.props.placeholder}</div>:null
                        }
                        {
                            this.state.seleted?
                            <div className={styles.title+" bdyt"}>{this.state.seleted.title}</div>
                            :
                            <div className={styles.placeholder+" bdyt"}>{this.props.placeholder || "انتخاب کنید"}</div>
                        }
                        
                        <DownOutlined className={styles.style_arrow}/>

                    </div>

                </AntDropdown>

            </div>
        )
    }
}
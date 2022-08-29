import IndexLayout from "@/views/layouts/IndexLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import { AutoComplete } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./ViewHelp.module.css";

/**
* Props of ViewHelp Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ViewHelp extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new ViewHelpController(this);
        this.state = {
            search_string:"",
            search_options:[
                {label:"label 1", value:"1"},
                {label:"label 2", value:"1"},
                {label:"label 3", value:"1"},
                {label:"label 4", value:"1"},
                {label:"label 5", value:"1"},
                {label:"label 6", value:"1"},
                {label:"label 7", value:"1"},
            ]
        }
    }
    
    componentDidMount(){
    }

    viewHelp=(data, sub)=>{

    }
    
    render(){
        return(
            <IndexLayout accessType="noAuth"
            showWithoutAuth={false}
            footerAutoLoad={true}>

                <WrapperT1 className={styles.wrapper}>

                    <div className={styles.white_con+" sm_card_shd"}>

                        <div className={styles.search_title}>{"راهنمای عمومی سایت"}</div>

                        <div className={styles.search_input_con+" sm_card_shd"}>

                            <img className={styles.search_icon} src={"/statics/svg/search_img.svg"}/>

                            <AutoComplete className={styles.search_auto}
                            dropdownMatchSelectWidth={200}
                            options={this.state.search_options}
                            defaultActiveFirstOption={false}
                            allowClear
                            notFoundContent={"محتوایی با این عنوان یافت نشد"}
                            open={this.state.search_string?true:false}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }>

                                <input className={styles.search_auto_input}
                                value={this.state.search_string}
                                onChange={this.onSearchInput}
                                placeholder={"جستجو در راهنمای عمومی سایت"}/>

                            </AutoComplete>

                        </div>

                    </div>


                </WrapperT1>
                
            </IndexLayout>
        )
    }
}
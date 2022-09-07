import HelpBreadcrumb from "@/views/components/help/HelpBreadcrumb";
import HPRegister from "@/views/components/help/HPRegister";
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
            help_page:null,
            search_string:"",
            search_options:[
                {label:"خرید دوره", value:"خرید دوره"},
                {label:"ثبت نام در سایت", value:"ثبت نام در سایت"},
            ]
            
        }

        this.state.help_page = <HPRegister/>
    }
    
    componentDidMount(){
    }

    viewHelp=(data, sub)=>{

    }

    onTreeSelect=(data, sub)=>{

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

                    <div className={styles.bread_crumb_con}>

                        <HelpBreadcrumb/>

                    </div>

                    <div className={styles.content_con}>

                        <div className={styles.content_wrapper}>

                            {
                                this.state.help_page
                            }

                        </div>

                        <div className={styles.right_heading_tree_con+" sm_card_shd"}>

                            {
                                env.HELP_CONTNET.map((v,i)=>{
                                    
                                    return <>
                                    <div className={styles.tree_title} key={i}
                                    onClick={()=>this.onTreeSelect(v)}>{v.title}</div>
                                    {
                                        v.sub.map((v2,i2)=>(
                                            <div className={styles.tree_sub+" "+((i==0&&i2==0)?styles.selected_tree_itme:"")} key={i2}
                                            onClick={()=>this.onTreeSelect(v, v2)}>{v2.title}</div>
                                        ))
                                    }
                                    </>
                                    
                                })
                            }
                             
                        </div>

                    </div>


                </WrapperT1>
                
            </IndexLayout>
        )
    }
}
import MainHelpSection from "@/controllers/components/help/MainHelpSection";
import IndexLayout from "@/views/layouts/IndexLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import { AutoComplete, Input } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./Help.module.css";

/**
* Props of Help Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Help extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new HelpController(this);
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

    onACSelect=()=>{

    }

    onSearchInput=(e)=>{

        this.setState({search_string:e.target.value});
    }
    
    render(){
        return(
            <IndexLayout accessType="noAuth"
            showWithoutAuth={false}
            footerAutoLoad={true}>

                <WrapperT1 className={styles.wrapper}>

                    <div className={styles.white_con+" sm_card_shd"}>

                        <img className={styles.search_bg_img} src={"/statics/img/help_main_bg.svg"}/>

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

                    <div className={styles.section_con}>

                        {
                            sections.map((v,i)=>(
                                <MainHelpSection key={i} data={v}/>
                            ))
                        }

                    </div>


                </WrapperT1>
                
            </IndexLayout>
        )
    }
}

const sections = [
    {
        title:"خرید دوره",
        sub:[
            {
                title:"ثبت نام در سایت",
                info:"با وجود این‌که انتظار می‌رقت پش از انتشار خبر آیین‌نامه واردات خودرو، بازار روندی نزولی یه خود بگیرد، اما اتفاق دیگری افتاد، به طوری قیمت خودروها صعودی شد."
            },
            {
                title:"ثبت نام در دوره",
                info:"با وجود این‌که انتظار می‌رقت پش از انتشار خبر آیین‌نامه واردات خودرو، بازار روندی نزولی یه خود بگیرد، اما اتفاق دیگری افتاد، به طوری قیمت خودروها صعودی شد."
            
            },
            {
                title:"لیست دوره های خریداری شده",
                info:"با وجود این‌که انتظار می‌رقت پش از انتشار خبر آیین‌نامه واردات خودرو، بازار روندی نزولی یه خود بگیرد، اما اتفاق دیگری افتاد، به طوری قیمت خودروها صعودی شد."
            
            }
        ]
    },
    {
        title:"خرید دوره",
        sub:[
            {
                title:"ثبت نام در سایت",
            },
            {
                title:"ثبت نام در دوره",
            },
            {
                title:"لیست دوره های خریداری شده"
            }
        ]
    },
    {
        title:"خرید دوره",
        sub:[
            {
                title:"ثبت نام در سایت",
            },
            {
                title:"ثبت نام در دوره",
            },
            {
                title:"لیست دوره های خریداری شده"
            }
        ]
    },
]
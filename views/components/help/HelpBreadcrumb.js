import { Breadcrumb, ConfigProvider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./HelpBreadcrumb.module.css";
import { HomeOutlined } from '@ant-design/icons';

/**
* Props of HelpBreadcrumb Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class HelpBreadcrumb extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new HelpBreadcrumbController(this);
        this.state = {
            breadcrumbItems:[],
        }
    }
    
    componentDidMount(){

        this.loadBreadCrumbList();
    }

    componentWillUnmount(){

    }

    loadBreadCrumbList=()=>{

        let breadcrumbItems = extractHelps(env.HELP_CONTNET);
        this.setState({breadcrumbItems});
    }
    
    render(){
        return(
            <div className={styles.con}>

            <ConfigProvider direction="rtl">
                <Breadcrumb>

                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>

                    <Breadcrumb.Item  href="/help">
                        {"راهنمای عمومی"}
                    </Breadcrumb.Item>

                    {
                        this.state.breadcrumbItems.map((v,i)=>(
                            <Breadcrumb.Item key={i} href={v.url}>
                                {v.title}
                            </Breadcrumb.Item>
                        ))
                    }

                </Breadcrumb>
            </ConfigProvider>
                
            </div>
        )
    }
}

function extractHelps (helps){

    return [
        {
            title: helps[0].title,
            url: "/help/"+helps[0].title,
        },
        {
            title: helps[0].sub[0].title,
            url: "/help/"+helps[0].sub[0].title,
        },
    ]
}
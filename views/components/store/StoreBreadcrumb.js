import { Breadcrumb, ConfigProvider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./StoreBreadcrumb.module.css";
import { HomeOutlined } from '@ant-design/icons';

/**
* Props of StoreBreadcrumb Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class StoreBreadcrumb extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new StoreBreadcrumbController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con}>

            <ConfigProvider direction="rtl">
                <Breadcrumb>

                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>

                    <Breadcrumb.Item  href="/store">
                        {"فروشگاه"}
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        {"آموزش برنامه نویسی"}
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        {"آموزش php"}
                    </Breadcrumb.Item>

                </Breadcrumb>
            </ConfigProvider>
                
            </div>
        )
    }
}
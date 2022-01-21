import { ConfigProvider, Pagination as MPagination } from "antd";
import React, { Component } from "react";
import styles from "./Pagination.module.css";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

/**
* Props of Pagination Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {number} total
* @property {number} currentPage
* @property {number} pageSize
* @property {(page)=>{}} onPageChange
* 
* @extends {Component<Props>}
*/
export default class Pagination extends Component {

    itemRender=(current, type, originalElement)=>{

        if (type === 'prev') {
          return <div style={{display:"none"}}/>;
        }
        if (type === 'next') {
          return <div style={{display:"none"}}/>;
        }
        return originalElement;
    }
    
    render(){

        let can_go_next, can_go_back=false;
        if(this.props.currentPage>1)can_go_back=true;
        if(this.props.currentPage<(this.props.total / this.props.pageSize))can_go_next=true;

        return(
            <>
            {
                this.props.total && (this.props.total > this.props.pageSize)?
                <div className={styles.con+" bglc1 sm_card_shd"}>

                    <ConfigProvider direction="ltr">

                        <MPagination
                        style={{direction:"ltr"}}
                        showTotal={()=>""}
                        total={this.props.total}
                        pageSize={this.props.pageSize}
                        showSizeChanger={false}
                        size="small"
                        current={this.props.currentPage}
                        onChange={this.props.onPageChange}
                        itemRender={this.itemRender}/>

                    </ConfigProvider>

                    {
                        can_go_next?
                        <div className={styles.next+" ftc2 amp_btn"} 
                        onClick={()=>this.props.onPageChange(this.props.currentPage+1)}>
                            {"صفحه بعد"}
                            <RightOutlined style={{marginLeft:"0.5rem"}}/>
                        </div>:null
                    }
                    {
                        can_go_back?
                        <div className={styles.back+" ftc2 amp_btn"} 
                        onClick={()=>this.props.onPageChange(this.props.currentPage-1)}>
                            <LeftOutlined style={{marginRight:"0.5rem"}}/>
                            {"صفحه قبل"}
                        </div>:null
                    }
                
                </div>
                :null
            }
            </>
        )
    }
}
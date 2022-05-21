import { Breadcrumb, ConfigProvider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./StoreBreadcrumb.module.css";
import { HomeOutlined } from '@ant-design/icons';
import Observer from "@/utils/observer";
import { getParamByName } from "@/utils/helpers";
import Storage from "@/utils/storage";

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
            breadcrumbItems:[],
        }
    }
    
    componentDidMount(){

        Observer.add("onUrlStateChange", this.loadBreadCrumbList);

        this.loadBreadCrumbList();
    }

    componentWillUnmount(){

        Observer.remove("onUrlStateChange", this.loadBreadCrumbList);
    }

    loadBreadCrumbList=()=>{

        let group = getParamByName("group");
        let group_list = Storage.get("categories");
        let groups = extractSelectedGroups(group, group_list);
        let breadcrumbItems = [];
        groups.forEach(g=>{
            let url = new URL(window.location);
            url.searchParams.set("group", g.key);
            breadcrumbItems.push({key: g.key, url, title: g.title});
        });
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

                    <Breadcrumb.Item  href="/store">
                        {"فروشگاه"}
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

function extractSelectedGroups (group, groupList){

    let key = group;
    
    if(!key || !groupList) return [];

    let ids = key.split("-");
    let level = ids.length;
    let groups = [];

    let l1 = null;
    groupList.forEach((g1)=>{
        if(g1.id == ids[0]){
            l1 = g1;
            groups.push({id:l1.id, key:l1.id, title:l1.title});
        }
    });

    let l2 = null;
    if(level > 1 && l1){
        let groupL2 = l1.groups;
        groupL2.forEach((g2)=>{
            if(g2.id == ids[1]){
                l2 = g2;
                groups.push({id:l2.id, key:l1.id+"-"+l2.id, title:l2.title});
            }
        });
    }

    if(level > 2 && l2){
        let l3 = null;
        let groupL3 = l2.groups;
        groupL3.forEach((g3)=>{
            if(g3.id == ids[2]){
                l3 = g3;
                groups.push({id:l3.id, key:l1.id+"-"+l2.id+"-"+l3.id, title:l3.title});
            }
        });
    }

    return groups;
}
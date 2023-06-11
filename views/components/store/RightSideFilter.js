import { Tree, ConfigProvider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./RightSideFilter.module.css";
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
import CrossSvg from "@/views/svgs/Cross";
import MainButton from "../global/MainButton";
import chest from "@/utils/chest";
import Storage from "@/utils/storage";
import { getParamByName } from "@/utils/helpers";
import { Input } from 'antd';
import Observer from "@/utils/observer";

/**
* Props of RightSideFilter Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class RightSideFilter extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new RightSideFilterController(this);

        let selected_groups = getParamByName("group");
        let selectedKeys = [];
        if(selected_groups){
            selectedKeys = [selected_groups];
        }

        this.state = {
            selectedKeys,
            expandedKeys: [],
            list:[],
        }
    }
    
    componentDidMount(){

        Observer.add("onUrlStateChange", this.onUrlStateChange);
        
        let categories = Storage.get("categories");

        this.keys = this.getAllKeys(categories);

        this.setState({list:categories, expandedKeys: this.keys});
    }

    onUrlStateChange=()=>{

        let selected_groups = getParamByName("group");
        let selectedKeys = [];
        if(selected_groups){
            selectedKeys = [selected_groups];
        }

        this.setState({selectedKeys:selectedKeys});
    }

    openModal=()=>{

        let modal = 
        <FilterModal onCancel={this.onModalCancel}
        onSubmit={this.onModalSubmit}
        parent={this}/>;

        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onModalCancel=()=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onModalSubmit=(data)=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onSearch=(phrase)=>{
        
        this.props.onSearch(phrase);
    }

    onSelectL1=(l1)=>{
        let groups = l1.id;
        //this.setState({selectedKeys:[groups.toString()]});
        this.props.onGroupSelect(groups);
    }

    onSelectL2=(l1, l2)=>{
        let groups = l1.id+"-"+l2.id;
        //this.setState({selectedKeys:[groups]});
        this.props.onGroupSelect(groups);
    }

    onSelectL3=(l1, l2, l3)=>{
        let groups = l1.id+"-"+l2.id+"-"+l3.id;
        //this.setState({selectedKeys:[groups]});
        this.props.onGroupSelect(groups);
    }

    getAllKeys=(data)=>{
        
        let allKeys = [];
        data.forEach((l1)=>{
            allKeys.push(l1.id.toString());
            l1.groups.forEach((l2)=>{
                allKeys.push(l1.id+"-"+l2.id);
                l2.groups.forEach((l3)=>{
                    allKeys.push(l1.id+"-"+l2.id+"-"+l3.id);
                });
            });
        });
        return allKeys;
    };

    onExpand=(expandedKeys)=>{
        this.setState({expandedKeys});
    };

    expandAll=()=>{
        this.setState({expandedKeys: this.keys});
    };

    collapseAll=()=>{
        this.setState({expandedKeys:[]});
    };

    allGroups=()=>{
        this.setState({selectedKeys:[]});
        this.props.onGroupSelect(null);
    }
    
    render(){
        return(
            <div className={styles.con+" md_card_shd "+this.props.className}>

                {/* <div className={styles.title+" fdc1 tilt"}>{"جستجو"}</div> */}

                <ConfigProvider direction="rtl">

                    <div className={styles.search_top+" blc3"}>
                        <Input.Search placeholder="جستجو"
                        allowClear size="large"
                        onSearch={this.onSearch} 
                        style={{border:"none"}}/>
                    </div>
                    
                </ConfigProvider>

                <div className={styles.title+" fdc1 tilt"}>{"دسته بندی ها"}</div>

                <div className={this.state.selectedKeys.length?styles.all_cat:styles.all_cat_selected} onClick={this.allGroups}>{"همه‌ دسته ها"}</div>

                <ConfigProvider direction="rtl">

                    <Tree
                    checkable={false}
                    onExpand={this.onExpand} 
                    expandedKeys={this.state.expandedKeys}
                    //showLine={true}
                    //showIcon={false}
                    //showLeafIcon={false}
                    //onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                    treeData={
                        this.state.list.map((l1, i1)=>{
                            return {
                                title: 
                                (<div className={styles.parent_node+" "+styles.l1} onClick={()=>this.onSelectL1(l1)}>
                                    {l1.title}
                                </div>),
                                key:`${l1.id}`,
                                children:
                                l1.groups && l1.groups.length? l1.groups.map((l2,i2)=>{
                                    return {
                                        title: 
                                        (<div className={styles.parent_node+" "+styles.l2} onClick={()=>this.onSelectL2(l1, l2)}>
                                            {l2.title}
                                        </div>),
                                        key:`${l1.id}-${l2.id}`,
                                        children:
                                        l2.groups && l2.groups.length? l2.groups.map((l3,i3)=>{
                                            return {
                                                title: 
                                                (<div className={styles.parent_node+" "+styles.l3} onClick={()=>this.onSelectL3(l1, l2, l3)}>
                                                    {l3.title}
                                                </div>),
                                                key:`${l1.id}-${l2.id}-${l3.id}`,
                                            }
                                        }):
                                        undefined
                                    }
                                }):
                                undefined
                            }
                        })
                    }/>

                </ConfigProvider>
                
            </div>
        )
    }
}

class FilterModal extends Component{

    constructor(props){
        super(props);
        let search_phrase = "";
        let search_p = getParamByName("search");
        if(search_p){search_phrase=search_p}
        this.state={
            search_phrase,
            expandedKeys: this.props.parent.state.expandedKeys,
            selectedKeys: this.props.parent.state.selectedKeys,
        }
    }

    onSearchInput=(e)=>{

        this.setState({search_phrase:e.target.value});
    }

    onSearch=(phrase)=>{
        
        //prevent closing the modal on clear button press if no search pharse is in url
        if(phrase==="" && !getParamByName("search")){return}

        this.props.parent.onSearch(phrase);
        this.props.onCancel();
    }

    onSelectL1=(l1)=>{

        this.props.parent.onSelectL1(l1);
        let groups = l1.id;
        this.setState({selectedKeys:[groups.toString()]});
        this.props.onCancel();
    }
    
    onSelectL2=(l1, l2)=>{

        this.props.parent.onSelectL2(l1, l2);
        let groups = l1.id+"-"+l2.id;
        this.setState({selectedKeys:[groups]});
        this.props.onCancel();
    }

    onSelectL3=(l1, l2, l3)=>{
        
        this.props.parent.onSelectL3(l1, l2, l3);
        let groups = l1.id+"-"+l2.id+"-"+l3.id;
        this.setState({selectedKeys:[groups]});
        this.props.onCancel();
    }

    onCancel=()=>{
        this.props.onCancel();
    }

    onSubmit=()=>{
        this.props.onSubmit(this.state.selected);
    }

    onExpand=(expandedKeys)=>{
        this.setState({expandedKeys});
    };

    render(){
        return(
            <div className={styles.fmodal_con+" bglc1 tbc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.fmodal_wrapper}>

                    <ConfigProvider direction="rtl">

                        <Input.Search placeholder="جستجو" 
                        value={this.state.search_phrase}
                        onChange={this.onSearchInput}
                        allowClear size="large"
                        onSearch={this.onSearch} 
                        style={{width: "96%",marginBottom:"1rem"}}/>

                    </ConfigProvider>

                    <div className={styles.fmodal_title+" fdc1 tilt"}>{"دسته بندی ها"}</div>

                    <ConfigProvider direction="rtl">

                    <Tree
                    checkable={false}
                    onExpand={this.onExpand} 
                    expandedKeys={this.state.expandedKeys}
                    selectedKeys={this.state.selectedKeys}
                    treeData={
                        this.props.parent.state.list.map((l1, i1)=>{
                            return {
                                title: 
                                (<div className={styles.parent_node+" "+styles.l1} onClick={()=>this.onSelectL1(l1)}>
                                    
                                    {l1.title}
                    
                                </div>),
                                key:`${l1.id}`,
                                children:
                                l1.groups && l1.groups.length? l1.groups.map((l2,i2)=>{
                                    return {
                                        title: 
                                        (<div className={styles.parent_node+" "+styles.l2} onClick={()=>this.onSelectL2(l1, l2)}>
                
                                            {l2.title}
                                            
                                        </div>),
                
                                        key:`${l1.id}-${l2.id}`,

                                        children:
                                        l2.groups && l2.groups.length? l2.groups.map((l3,i3)=>{
            
                                            return {
                                                title: 
                                                (<div className={styles.parent_node+" "+styles.l3} onClick={()=>this.onSelectL3(l1, l2, l3)}>
            
                                                    {l3.title}
            
                                                </div>),
            
                                                key:`${l1.id}-${l2.id}-${l3.id}`,
                                            }
                                        }):
                                        undefined
                                    }
                                }):
                                undefined
                            }
                        })
                    }/>

                    </ConfigProvider>

                </div>

            </div>
        )
    }
}
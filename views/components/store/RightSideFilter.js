import { Tree, ConfigProvider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./RightSideFilter.module.css";
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
import CrossSvg from "@/views/svgs/Cross";
import MainButton from "../global/MainButton";
import chest from "@/utils/chest";

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
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    openModal=()=>{

        let modal = 
        <FilterModal onCancel={this.onModalCancel}
        onSubmit={this.onModalSubmit}
        data={{}}/>;

        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onModalCancel=()=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onModalSubmit=(data)=>{

        chest.ModalLayout.closeAndDelete(1);
    }
    
    render(){
        return(
            <div className={styles.con+" md_card_shd "+this.props.className}>

                <div className={styles.title+" fdc1 tilt"}>{"دسته بندی ها"}</div>

                <ConfigProvider direction="rtl">

                    <Tree
                    showLine={{showLeafIcon: false}}
                    showIcon={false}
                    checkable={false}
                    defaultExpandAll={true}
                    treeData={fakeData}/>

                </ConfigProvider>
                
            </div>
        )
    }
}

class FilterModal extends Component{

    constructor(props){
        super(props);
        this.state={
            selected:props.selected,
        }
    }

    onCancel=()=>{
        this.props.onCancel();
    }

    onSubmit=()=>{
        this.props.onSubmit(this.state.selected);
    }

    onSelect=(key)=>{
        this.setState({selected:key});
    }

    render(){
        return(
            <div className={styles.fmodal_con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.fmodal_wrapper}>

                    <div className={styles.fmodal_title+" fdc1 tilt"}>{"دسته بندی ها"}</div>

                    <ConfigProvider direction="rtl">

                        <Tree
                        showLine={{showLeafIcon: false}}
                        showIcon={false}
                        checkable={false}
                        defaultExpandAll={true}
                        treeData={fakeData}/>

                    </ConfigProvider>

                </div>

            </div>
        )
    }
}

const fakeData = [
    {
    title: 'parent 1',
    key: '0-0',
    children: [
        {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
            {
                title: 'leaf',
                key: '0-0-0-0',
            },
            {
                title: 'leaf',
                key: '0-0-0-1',
            },
            ],
        },
        {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
        },
    ],
    },
];
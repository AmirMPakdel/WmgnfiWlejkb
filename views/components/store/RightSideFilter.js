import { Tree, ConfigProvider } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./RightSideFilter.module.css";

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
    
    render(){
        return(
            <div className={styles.con+" md_card_shd "+this.props.className}>

                <ConfigProvider direction="ltr">

                    <Tree
                    showLine={true}
                    showIcon={false}
                    showLeafIcon={false}
                    switcherIcon={<div>^</div>}
                    treeData={fakeData}/>

                </ConfigProvider>
                
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
            disabled: true,
            children: [
            {
                title: 'leaf',
                key: '0-0-0-0',
                disableCheckbox: true,
                icon:<div/>,
                switcherIcon:<div/>,
            },
            {
                title: 'leaf',
                key: '0-0-0-1',
                icon:<div/>,
                switcherIcon:<div/>,
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
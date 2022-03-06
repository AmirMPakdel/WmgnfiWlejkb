import React, { Component } from "react";
import { Tree } from 'antd';
import CrossSvg from "@/views/svgs/Cross";
import styles from "./CategoryCrudModal.module.css";
import MainButton from "../../global/MainButton";

/**
* Props of CategoryCrudModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class CategoryCrudModal extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new CategoryCrudModalController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.wrapper}>

                    <div className={styles.title+" tilt "}>{"ویرایش دبیر"}</div>

                    <div className={styles.form_body}>

                       <Tree
                       checkable
                       defaultExpandedKeys={['0-0-0', '0-0-1']}
                       defaultSelectedKeys={['0-0-0', '0-0-1']}
                       defaultCheckedKeys={['0-0-0', '0-0-1']}
                       onSelect={this.onSelect}
                       onCheck={this.onCheck}
                       treeData={treeData}/>

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ویرایش"}
                        loading={this.state.btn_loading}
                        onClick={this.onEdit}/>

                    </div>

                </div>

            </div>
        )
    }
}

const treeData = [
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
          children: [
            {
              title: (
                <span
                  style={{
                    color: '#1890ff',
                  }}
                >
                  sss
                </span>
              ),
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];
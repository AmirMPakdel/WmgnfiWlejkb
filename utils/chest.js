import { Component } from "react";
import { notification } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import "@/models/jsdoc/User"
import Observer from "@/utils/observer";

let chest = {
    
    user:null,

    UserPanel:{
        userChangeTab: (jsx)=>{},
    },

    ModalLayout:{
        setModal: (layer, jsx, cb)=>{},
        visibleToggle: (layer, visible, cb)=>{},
        closeAndDelete:(layer, cb)=>{},
    },

    SideMenu:{
        menu_is_open:false,
        openSideMenu:()=>{},
        closeSideMenu:()=>{},
    },

    EducatorsCrudModal:{
        controller:{},
    },

    disableBodyVerticalScroll : ()=>{},
    enableBodyVerticalScroll : ()=>{},
    disableAllAntDTooltips : ()=>{},
    enableAllAntDTooltips : ()=>{},

    /**
     * shows a notification on screen
     * @param {string} title 
     * @param {"success"|"alert"|"error"} icon 
     * @param {{ducation:number}} options 
     */
    openNotification : (title, icon, options)=>{},
}

export class ChestComponent extends Component{
    
    componentDidMount(){
        chest.disableBodyVerticalScroll = this.disableBodyVerticalScroll;
        chest.enableBodyVerticalScroll = this.enableBodyVerticalScroll;
        chest.disableAllAntDTooltips = this.disableAllAntDTooltips;
        chest.enableAllAntDTooltips = this.enableAllAntDTooltips;
        chest.openNotification = this.openNotification;

        this.onResize();
        window.addEventListener("resize", this.ResizeObserver);
        Observer.add("onResize", this.onResize);

        this.enableAllAntDTooltips();

        setColors();
    }

    componentWillUnmount(){
        chest.disableBodyVerticalScroll = ()=>{};
        chest.enableBodyVerticalScroll = ()=>{};
        chest.disableAllAntDTooltips = ()=>{};
        chest.enableAllAntDTooltips = ()=>{};
        chest.openNotification = ()=>{};
    }

    ResizeObserver=(window, event)=>{
        Observer.execute("onResize", window, event);
    }

    onResize=()=>{
        // rem
        if (window.innerWidth > 1600) {
            // let rem = (window.innerWidth * 16) / 1600;
            // document.getElementsByTagName("html")[0].style.fontSize = `${rem}px`;
        } else if (window.innerWidth < 360) {
            let rem = (window.innerWidth * 16) / 362;
            document.getElementsByTagName("html")[0].style.fontSize = `${rem}px`;
        } else {
            document.getElementsByTagName("html")[0].style.fontSize = `${16}px`;
        }
    }

    disableBodyVerticalScroll = ()=>{
        document.getElementsByTagName("body")[0].style.overflowY="hidden";
        document.getElementsByTagName("body")[0].style.overflowX="hidden";
    }

    enableBodyVerticalScroll = ()=>{
        document.getElementsByTagName("body")[0].style.overflowY="visible";
        document.getElementsByTagName("body")[0].style.overflowX="unset";
    }

    disableAllAntDTooltips = ()=>{
        let tooltip = document.getElementsByClassName('ant-tooltip');
        for(let i = 0; i < tooltip.length; i++) {
            tooltip[i].style.display = 'none';
        }
    }

    enableAllAntDTooltips = ()=>{
        let tooltip = document.getElementsByClassName('ant-tooltip');
        for(let i = 0; i < tooltip.length; i++) {
            tooltip[i].style.display = 'block';
        }
    }

    openNotification = (title, icon, options) => {

        if(!options){options={}}
      
        if(!options.duration){options.duration=5}
      
        if(!options.description){options.description = ""};
      
        if(icon=="error"){icon=<ExclamationCircleOutlined style={{ color: env.THEME.ec }}/>}
        if(icon=="success"){icon=<CheckCircleOutlined style={{ color: env.THEME.sc }}/>}
        if(icon=="alert"){icon=<ExclamationCircleOutlined style={{ color: env.THEME.tc2 }}/>}
      
        notification.open({
          message: title,
          duration:options.duration,
          description: options.description,
          icon,
        });
      };

    render(){
        return null;
    }
}

function setColors(){

    // let tc1 = getCookie("tc1");

    // let sheet = document.createElement('style')
    // sheet.innerHTML = `.bgtc1 {background-color: ${tc1};}`;
    // document.body.appendChild(sheet);
}

export default chest;
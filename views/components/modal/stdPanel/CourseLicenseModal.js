import React, { Component } from "react";
import styles from "./CourseLicenseModal.module.css";
import CrossSvg from "@/views/svgs/Cross";
import CourseLicenseController from "@/controllers/components/modals/stdPanel/CourseLicenseController";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";

/**
* Props of CourseLicenseModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class CourseLicenseModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new CourseLicenseController(this);
        this.state = {
            loading:true,
        }
    }
    
    componentDidMount(){

        this.controller.loadLicenseData();
    }

    onCancel=()=>{
        
        this.controller.onCancel();
    }

    copyCode=()=>{

        this.controller.copyCode();
    }
    
    render(){
        let d = this.props.data;
        let s = this.state;
        return(
            <div className={styles.con+" bgw btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                {
                    this.state.loading?
                    <Loading className={styles.loading}/>
                    :
                    <div className={styles.wrapper}>

                        <div className={styles.title+" tilt "}>{"کد خرید " + d.title}</div>

                        <div className={styles.form_body}>

                            <div className={styles.license_con+" btc2i"}>

                                <input className={styles.license}
                                value={this.state.license}
                                disabled={1}/>

                                <MainButton className={styles.copy_btn}
                                title={"کپی کردن"}
                                onClick={this.copyCode}/>

                            </div>

                            <div className={styles.active_title+" tilt "}>{"وضعیت فعال بودن کد خرید"}</div>

                            {
                                !s.device_one && !s.device_two?
                                <div className={styles.active_info+" fdc1"}>{"این دوره در هیچ دستگاهی فعال نیست."}</div>
                                :
                                <>
                                    {
                                        s.device_one?
                                        <>
                                        <div className={styles.active_info+" engNum fdc1"}>&#8226; {"دستگاه اول"}</div>
                                        <div className={styles.active_info+" engNum fdc1"}>{"سیستم عامل :   "+s.device_one.platform}</div>
                                        <div className={styles.active_info+" engNum fdc1"}>{"شناسه دستگاه :   "+s.device_one.uid}</div>
                                        <div style={{marginBottom:"1rem"}}/>
                                        </>:null
                                    }
                                    {
                                        s.device_two?
                                        <>
                                        <div className={styles.active_info+" engNum fdc1"}>&#8226; {"دستگاه دوم"}</div>
                                        <div className={styles.active_info+" engNum fdc1"}>{"سیستم عامل :   "+s.device_two.platform}</div>
                                        <div className={styles.active_info+" engNum fdc1"}>{"شناسه دستگاه :   "+s.device_two.uid}</div>
                                        </>:null
                                    }
                                </>
                            }

                        </div>

                    </div>

                }

            </div>
        )
    }
}
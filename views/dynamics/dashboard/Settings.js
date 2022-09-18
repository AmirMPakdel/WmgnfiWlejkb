import React, { Component } from "react";
import chest from "@/utils/chest";
import EducatorsCrudModal from "@/views/components/modal/educators/EducatorsCrudModal";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import styles from "./Settings.module.css";
import CategoryCrudModal from "@/views/components/modal/global/CategoryCrudModal";
import EditSitesTitlesModal from "@/views/components/modal/settings/EditSitesTitlesModal";
import EditSitesIconModal from "@/views/components/modal/settings/EditSitesIconModal";
import EditHeaderLogoModal from "@/views/components/modal/settings/EditHeaderLogoModal";

/**
* Props of Settings Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Settings extends Component {

    componentDidMount(){

        this.setupPageTitle();
    }

    setupPageTitle=()=>{
        
        document.title = "تنظیمات سایت "+" | داشبورد کاربر"+" | مینفو";
    }

    onEducators=()=>{
        let modal = <EducatorsCrudModal editable={true}/>
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onCategories=()=>{
        let modal = <CategoryCrudModal/>
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onSitesTitle=()=>{
        let modal = <EditSitesTitlesModal/>
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onSitesLogo=()=>{
        let modal = <EditSitesIconModal/>
        chest.ModalLayout.setAndShowModal(1, modal);
    }
    
    onHeaderLogo=()=>{
        let modal = <EditHeaderLogoModal/>
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>
                
                <WrapperT1>

                    <div className={styles.con}>

                        <div className={styles.row}>

                            <Card  onClick={this.onEducators}
                            title={"ویرایش دبیران"}/>

                            <Card  onClick={this.onCategories}
                            title={"ویرایش دسته بندی"}/>

                        </div>

                        <div className={styles.row}>

                            <Card  onClick={this.onSitesTitle}
                            title={"ویرایش عنوان سایت"}/>

                            
                            <Card  onClick={this.onHeaderLogo}
                            title={"ویرایش لوگوی هدر سایت"}/>
                            
                        </div>

                    </div>

                </WrapperT1>
            </EducatorDashboardLayout>
        )
    }
}

function Card(props){

    return(
        <div className={styles.setting_card+" md_card_shd amp_btn bgw"} onClick={props.onClick}>

            <div className={styles.setting_card_t+" tilt"}>{props.title}</div>

        </div>
    )
}
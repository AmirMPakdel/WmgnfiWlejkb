import React, { Component } from "react";
import chest from "@/utils/chest";
import EducatorsCrudModal from "@/views/components/modal/educators/EducatorsCrudModal";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import styles from "./Settings.module.css";
import CategoryCrudModal from "@/views/components/modal/global/CategoryCrudModal";
import EditSitesTitlesModal from "@/views/components/modal/settings/EditSitesTitlesModal";
import EditSitesIconModal from "@/views/components/modal/settings/EditSitesIconModal";

/**
* Props of Settings Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Settings extends Component {

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
    
    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>
                
                <WrapperT1>

                    <div className={styles.con}>

                        <div className={styles.row}>

                            <div className={styles.setting_card+" md_card_shd amp_btn bglc1"} onClick={this.onEducators}>

                                <div className={styles.setting_card_t+" tilt"}>{"ویرایش دبیران"}</div>

                            </div>

                            <div className={styles.setting_card+" md_card_shd amp_btn bglc1"} onClick={this.onCategories}>

                                <div className={styles.setting_card_t+" tilt"}>{"ویرایش دسته بندی"}</div>

                            </div>

                        </div>

                        <div className={styles.row}>

                            <div className={styles.setting_card+" md_card_shd amp_btn bglc1"} onClick={this.onSitesTitle}>

                                <div className={styles.setting_card_t+" tilt"}>{"ویرایش عنوان سایت"}</div>

                            </div>

                            <div className={styles.setting_card+" md_card_shd amp_btn bglc1"} onClick={this.onSitesLogo}>

                                <div className={styles.setting_card_t+" tilt"}>{"ویرایش لوگوی سایت"}</div>

                            </div>
                            
                        </div>

                    </div>

                </WrapperT1>
            </EducatorDashboardLayout>
        )
    }
}